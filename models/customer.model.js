const db = require('../config/db.config');

const Customer = {
  async create(customer) {
    const { name, quota } = customer;
    const [result] = await db.query("INSERT INTO customers (name, quota) VALUES (?, ?)", [name, quota]);
    return result.insertId;
  },
  async findById(id) {
    const [rows] = await db.query("SELECT * FROM customers WHERE id = ?", [id]);
    return rows[0];
  },
  async updateQuota(id, quantity) {
    // Mengurangi jatah pembelian pelanggan
    await db.query("UPDATE customers SET quota = quota - ? WHERE id = ?", [quantity, id]);
  },
  async findAll() {
    const [rows] = await db.query("SELECT * FROM customers");
    return rows;
  }
};

module.exports = Customer;
