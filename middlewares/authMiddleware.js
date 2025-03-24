const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Middleware untuk verifikasi token & mendapatkan data user
const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) return res.status(401).json({ message: "User tidak ditemukan!" });

        req.user = user; // Simpan user di request
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

// Middleware untuk otorisasi berdasarkan role
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Akses ditolak! Hanya ${role} yang bisa mengakses.` });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRole };
