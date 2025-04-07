const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.createUser = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create({ username, password: hashedPassword, role });
        res.status(201).json({ message: 'User berhasil dibuat', userId });
    } catch (err) {
        next(err);
    }
};