const db = require('../config/db.config');

const Transaction = {
  async create(transaction) {
    const { user_id, customer_id, total, date } = transaction;
    const [result] = await db.query(
      "INSERT INTO transactions (user_id, customer_id, total, date) VALUES (?, ?, ?, ?)",
      [user_id, customer_id, total, date]
    );
    return result.insertId;
  },
  async findByDate(date) {
    const [rows] = await db.query("SELECT * FROM transactions WHERE DATE(date) = ?", [date]);
    return rows;
  },
  async findAll() {
    const [rows] = await db.query("SELECT * FROM transactions");
    return rows;
  }
};

module.exports = Transaction;
