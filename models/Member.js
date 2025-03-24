module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        nik: { type: DataTypes.STRING, unique: true, allowNull: false},
        name: { type: DataTypes.STRING, allowNull: false},
        address: { type: DataTypes.TEXT, allowNull: false},
    });

    Member.associate = (models) => {
        Member.hasMany(models.MemberQuota, { foreignKey: "memberId", as: "quotas"});
    };

    return Member;
};