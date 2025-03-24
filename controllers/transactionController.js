const puppeteer = require("puppeteer");
const hbs = require("hbs");
const fs = require("fs");
const path = require("path");
const { Transaction, TransactionDetail, Product, Member, MemberQuota } = require("../models");
const { formatRupiah } = require("../utils/currencyFormatter");

// Buat Transaksi dengan Sistem Member & Batasan Kuota
exports.createTransaction = async (req, res) => {
    try {
        const { nik, items, payment } = req.body;

        // Validasi input
        if (!nik || !items || !Array.isArray(items) || items.length === 0 || !payment) {
            return res.status(400).json({ message: "Data tidak lengkap!" });
        }

        // Cek apakah member terdaftar
        const member = await Member.findOne({ where: { nik } });
        if (!member) {
            return res.status(404).json({ message: "Member tidak ditemukan! Harap daftar terlebih dahulu." });
        }

        let total = 0;
        const updatedProducts = [];

        // Hitung total harga & validasi stok serta jatah member
        for (const item of items) {
            const product = await Product.findByPk(item.product_id);
            if (!product) {
                return res.status(404).json({ message: `Produk dengan ID ${item.product_id} tidak ditemukan!` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Stok tidak mencukupi untuk produk ${product.name}!` });
            }

            // Cek jatah pembelian member
            const quota = await MemberQuota.findOne({
                where: { member_id: member.id, product_id: product.id }
            });

            if (!quota || quota.remaining_quota < item.quantity) {
                return res.status(400).json({ message: `Kuota tidak mencukupi untuk produk ${product.name}!` });
            }

            total += product.price * item.quantity;
            updatedProducts.push({ product, quantity: item.quantity, quota });
        }

        // Cek pembayaran
        if (payment < total) {
            return res.status(400).json({ message: "Pembayaran tidak mencukupi!" });
        }

        // Simpan transaksi ke database
        const transaction = await Transaction.create({
            member_id: member.id,
            total,
            payment,
            change_amount: payment - total,
            date: new Date(),
        });

        // Simpan detail transaksi & update stok produk serta kuota member
        for (const { product, quantity, quota } of updatedProducts) {
            await TransactionDetail.create({
                transaction_id: transaction.id,
                product_id: product.id,
                quantity,
                subtotal: quantity * product.price,
            });

            // Kurangi stok produk
            await Product.update(
                { stock: product.stock - quantity },
                { where: { id: product.id } }
            );

            // Kurangi kuota pembelian member
            await MemberQuota.update(
                { remaining_quota: quota.remaining_quota - quantity },
                { where: { id: quota.id } }
            );
        }

        res.status(201).json({
            message: "Transaksi berhasil!",
            transaction: {
                id: transaction.id,
                total: formatRupiah(transaction.total),
                payment: formatRupiah(transaction.payment),
                change_amount: formatRupiah(transaction.change_amount),
                date: transaction.date,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat memproses transaksi!", error });
    }
};

// Get Semua Transaksi
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                {
                    model: TransactionDetail,
                    as: "details",
                    include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: ["name", "price"],
                        },
                    ],
                },
                {
                    model: Member,
                    as: "member",
                    attributes: ["nik", "name", "address"],
                },
            ],
        });

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal mengambil data transaksi!", error });
    }
};

// Generate Nota & Simpan ke Gambar
exports.generateInvoiceImage = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await Transaction.findByPk(transactionId, {
            include: [
                { model: TransactionDetail, as: "details" },
                { model: Member, as: "member" }
            ]
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan!" });
        }

        // Format data untuk template
        const transactionData = {
            date: transaction.date,
            customer: transaction.member ? transaction.member.name : "Pelanggan Umum",
            total: formatRupiah(transaction.total),
            payment: formatRupiah(transaction.payment),
            change_amount: formatRupiah(transaction.change_amount),
            items: await Promise.all(transaction.details.map(async (item) => {
                const product = await Product.findByPk(item.product_id);
                return {
                    name: product ? product.name : "Produk Tidak Diketahui",
                    quantity: item.quantity,
                    subtotal: formatRupiah(item.subtotal),
                };
            })),
        };

        // Render template
        const htmlContent = await compileTemplate("invoice", transactionData);

        // Gunakan Puppeteer untuk menyimpan sebagai gambar
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const imagePath = path.join(__dirname, `../public/invoices/invoice_${transactionId}.png`);
        await page.screenshot({ path: imagePath, fullPage: true });

        await browser.close();
        res.json({ message: "Nota berhasil dibuat!", imageUrl: `/public/invoices/invoice_${transactionId}.png` });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat nota transaksi!", error });
    }
};
