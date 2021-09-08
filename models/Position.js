const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Position = sequelize.define('position', {
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

    Position.associate = ({ doctor }) => {
        Position.hasMany(doctor, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Position
}