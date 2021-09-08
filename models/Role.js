const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Role = sequelize.define('role', {
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

    Role.associate = ({ user }) => {
        Role.belongsToMany(user, {
            through: 'User_Roles',
            allowNull: false
        });
    };

    return Role
}