const Transaction = require('../models/transaction.model');
const TransactionDetail = require('../models/transaction_detail.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

exports.createTransaction = async (req, res, next) => {
  try {
    const { customer_id, products } = req.body; // products: [{ product_id, quantity, price }, ...]
    let total = 0;
    products.forEach(item => {
      total += item.price * item.quantity;
    });

    const transactionId = await Transaction.create({
      user_id: req.user.id, // didapat dari middleware auth
      customer_id,
      total,
      date: new Date()
    });

    for (const item of products) {
      await TransactionDetail.create({
        transaction_id: transactionId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });
      // Update stok produk (mengurangi stok)
      await Product.updateStock(item.product_id, -item.quantity);
      // Update jatah pembeli
      await Customer.updateQuota(customer_id, item.quantity);
    }

    res.status(201).json({ message: 'Transaksi berhasil', transactionId });
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};
