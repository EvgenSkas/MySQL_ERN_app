const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Status = sequelize.define('status', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: false
    })

    Status.associate = ({ treatment }) => {
        Status.hasOne(treatment, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Status
}