const Product = require('../models/product.model');

exports.createProduct = async (req, res, next) => {
    try {
        const { name, category, price, stock } = req.body;
        const image = req.file ? req.file.filename : null;
        const productId = await Product.create({ name, category, price, stock, image });
        res.status(201).json({ message: 'Produk berhasil ditambahkan', productId });
    } catch (err) {
        next(err);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan'});
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock } = req.body;
        const image = req.file ? req.file.filename : req.body.image;
        await Product.update(id, { name, category, price, stock, image });
        res.json({ message: 'Produk berhasil diperbarui'});
    } catch (err) {
        next(err);
    }
};

exports.deleteProduk = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.delete(id);
        res.json({ message: 'Produk berhasil dihapus'});
    } catch (err) {
        next(err);
    }
};