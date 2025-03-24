module.exports = (sequelize, DataTypes) => {
    const TransactionDetail = sequelize.define("TransactionDetail", {
        transaction_id: { type: DataTypes.INTEGER, allowNull: false },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    });

    // ✅ Definisikan semua relasi di sini
    TransactionDetail.associate = (models) => {
        TransactionDetail.belongsTo(models.Transaction, { foreignKey: "transaction_id", as: "transaction" });
        TransactionDetail.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    };

    return TransactionDetail;
};
