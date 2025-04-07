const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, customerController.createCustomer);
router.get('/', verifyToken, customerController.getCustomers);

module.exports = router;
