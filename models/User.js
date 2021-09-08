const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const User = sequelize.define('user', {
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
        email: {
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

    User.associate = ({ role, doctor, patient }) => {
        User.hasOne(doctor)
        User.hasOne(patient)
        User.belongsToMany(role, {
            through: 'User_Roles',
        });
    };


    return User
}