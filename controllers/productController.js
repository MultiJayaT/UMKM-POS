const { Product } = require("../models");

// Tambah Produk
exports.createProduct = async (req, res) => {
    try {
        const { name, price, stock, barcode } = req.body;
        const product = await Product.create({ name, price, stock, barcode });

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
};

// Get Semua Produk
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Update Produk
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, barcode } = req.body;
        await Product.update({ name, price, stock, barcode }, { where: { id } });

        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Hapus Produk
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: { id } });

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
