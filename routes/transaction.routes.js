const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { verifyToken, isKasir } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, isKasir, transactionController.createTransaction);
router.get('/', verifyToken, transactionController.getTransactions);

module.exports = router;
