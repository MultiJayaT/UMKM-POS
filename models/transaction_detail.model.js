const db = require('../config/db.config');

const TransactionDetail = {
  async create(detail) {
    const { transaction_id, product_id, quantity, price } = detail;
    const [result] = await db.query(
      "INSERT INTO transaction_details (transaction_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [transaction_id, product_id, quantity, price]
    );
    return result.insertId;
  },
  async getDetailsByTransactionId(transaction_id) {
    const [rows] = await db.query("SELECT * FROM transaction_details WHERE transaction_id = ?", [transaction_id]);
    return rows;
  }
};

module.exports = TransactionDetail;
