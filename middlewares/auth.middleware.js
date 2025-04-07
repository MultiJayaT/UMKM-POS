const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    // Ambil header authorization dengan ejaan yang benar
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token tidak ditemukan' });
    }
    // Pecah string header berdasarkan spasi, sehingga menghasilkan ['Bearer', '<token>']
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Format token tidak valid' });
    }
    const token = tokenParts[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
        req.user = decoded;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    // Periksa req.user, bukan res.user
    if (req.user && req.user.role === 'admin') return next();
    return res.status(403).json({ message: 'Hanya Admin yang dapat akses' });
};

exports.isKasir = (req, res, next) => {
    // Periksa req.user, bukan res.user
    if (req.user && req.user.role === 'kasir') return next();
    return res.status(403).json({ message: 'Hanya Kasir yang dapat akses' });
};
