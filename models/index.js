const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Inisialisasi Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import model
db.User = require("./User")(sequelize, DataTypes);
db.Product = require("./Product")(sequelize, DataTypes);
db.Transaction = require("./Transaction")(sequelize, DataTypes);
db.TransactionDetail = require("./TransactionDetail")(sequelize, DataTypes);

// Panggil associate jika ada di model
Object.keys(db).forEach((modelName) => {
    if (db[modelName] && typeof db[modelName].associate === "function") {
        db[modelName].associate(db);
    }
});

// Sinkronisasi database (hanya saat development)
if (process.env.NODE_ENV === "development") {
    sequelize.sync({ alter: true })
        .then(() => console.log("✅ Database & tables synced!"))
        .catch((err) => console.error("❌ DB Sync Error:", err));
}

module.exports = db;
