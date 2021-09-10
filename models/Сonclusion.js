const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Сonclusion = sequelize.define('сonclusion', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
        },
        recommendation: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: true
    })

    Сonclusion.associate = ({ treatment, doctor }) => {
        Сonclusion.belongsTo(treatment, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
        });
        Сonclusion.belongsTo(doctor, {
            foreignKey: {
                allowNull: false
            },
        });
    };

    return Сonclusion
}