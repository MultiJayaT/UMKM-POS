const db = require('../config/db.config');

const Product = {
  async create(product) {
    const { name, category, price, stock, image } = product;
    const [result] = await db.query(
      "INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)",
      [name, category, price, stock, image]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },
  async update(id, product) {
    const { name, category, price, stock, image } = product;
    await db.query(
      "UPDATE products SET name = ?, category = ?, price = ?, stock = ?, image = ? WHERE id = ?",
      [name, category, price, stock, image, id]
    );
  },
  async delete(id) {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
  },
  async updateStock(id, quantity) {
    // quantity bernilai negatif untuk mengurangi stok
    await db.query("UPDATE products SET stock = stock + ? WHERE id = ?", [quantity, id]);
  }
};

module.exports = Product;
