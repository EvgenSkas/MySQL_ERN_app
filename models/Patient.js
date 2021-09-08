const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Patient = sequelize.define('patient', {
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
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    Patient.associate = ({ user }) => {
        Patient.belongsTo(user, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
        });
    };


    return Patient
}