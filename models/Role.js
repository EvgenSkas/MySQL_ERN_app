const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Role = sequelize.define('Role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            unique: true,
            default: 'USER'
        },
    }, {
        timestamps: false
    })

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: 'User_Roles',
        });
    };

    return Role
}