const { Member, MemberQuota, Product } = require("../models");

// ✅ Register Member
exports.registerMember = async (req, res) => {
    try {
        const { nik, name, address } = req.body;

        // Cek apakah NIK sudah terdaftar
        const existingMember = await Member.findOne({ where: { nik } });
        if (existingMember) {
            return res.status(400).json({ message: "NIK sudah terdaftar!" });
        }

        // Buat member baru
        const member = await Member.create({ nik, name, address });

        // Ambil semua produk dan buat jatah maksimal untuk setiap produk
        const products = await Product.findAll();
        for (const product of products) {
            await MemberQuota.create({
                memberId: member.id,
                productId: product.id,
                maxQuota: 10, // Jatah default
                remainingQuota: 10, // Sisa awal
            });
        }

        res.status(201).json({ message: "Member berhasil didaftarkan", member });
    } catch (error) {
        res.status(500).json({ message: "Error registering member", error });
    }
};

// ✅ Cari Member Berdasarkan NIK
exports.getMemberByNIK = async (req, res) => {
    try {
        const { nik } = req.params;
        const member = await Member.findOne({
            where: { nik },
            include: [{ model: MemberQuota, as: "quotas", include: [{ model: Product, as: "product" }] }]
        });

        if (!member) {
            return res.status(404).json({ message: "Member tidak ditemukan!" });
        }

        res.json(member);
    } catch (error) {
        res.status(500).json({ message: "Error fetching member", error });
    }
};
