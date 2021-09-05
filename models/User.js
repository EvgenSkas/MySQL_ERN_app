const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    })

    User.associate = (models) => {
        User.belongsToMany(models.Role, {
            through: 'User_Roles',
        });
        User.hasMany(models.Address);
    };


    return User
}