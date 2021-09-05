const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Address = sequelize.define('Address', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        place: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: false
    })

    Address.associate = models => {
        Address.belongsTo(models.User)
    }

    return Address
}