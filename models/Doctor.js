const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Doctor = sequelize.define('doctor', {
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    })

    Doctor.associate = ({ position, user, сonclusion }) => {
        Doctor.belongsTo(position, {
            foreignKey: {
                allowNull: false
            },
        });
        Doctor.belongsTo(user, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE',
        });
        Doctor.hasMany(сonclusion, {
            onDelete: 'CASCADE',
        });
    };


    return Doctor
}