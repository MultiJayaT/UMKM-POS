const db = require('../config/db.config');

const User = {
    async findByUsername(username) {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        return rows[0];
    },
    async create(user) {
        const { username, password, role } = user;
        const [result] = await db.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, password, role]
        );
        return result.insertId;
    }
};

module.exports = User;