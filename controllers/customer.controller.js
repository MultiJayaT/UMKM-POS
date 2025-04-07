const Customer = require('../models/customer.model');

exports.createCustomer = async (req, res, next) => {
    try {
        const { name, quota } = req.body;
        const customerId = await Customer.create({ name, quota });
        res.status(201).json({ message: 'Pembeli berhasil ditambahkan', customerId });
    } catch (err) {
        next(err);
    }
};

exports.getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        next(err);
    }
};