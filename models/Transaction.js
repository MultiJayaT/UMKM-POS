module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        payment: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        change_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
    }, { timestamps: true });

    // ✅ Definisikan semua relasi di sini
    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        Transaction.hasMany(models.TransactionDetail, { foreignKey: "transaction_id", as: "details", onDelete: "CASCADE" });
    };

    return Transaction;
};
