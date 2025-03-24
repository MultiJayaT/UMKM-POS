module.exports =  (sequelize, DataTypes) => {
    const MemberQuota = sequelize.define("MemberQuota", {
        memberId: { type: DataTypes.INTERGER, allowNull: false},
        productId: { type: DataTypes.INTERGER, allowNull: false},
        maxQuota: { type: DataTypes.INTERGER, allowNull: false},
        remainingQuota: { type: DataTypes.INTERGER, allowNull: false},
    });

    MemberQuota.associate = (models) => {
        MemberQuota.belongsTo(models.Member, { foreignKey: "memberId", as: "member" });
        MemberQuota.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
    }

    return MemberQuota;
};