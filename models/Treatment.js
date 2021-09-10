const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    const Treatment = sequelize.define('treatment', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        complaints: {
            type: Sequelize.STRING,
            allowNull: false
        },
        illnessDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        // кожные покровы
        skin: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // задняя стенка горла
        pharyngealWall: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // миндалины
        tonsils: {
            type: Sequelize.STRING,
            allowNull: false
        },
        temperature: {
            type: Sequelize.STRING,
            allowNull: false
        },
        heartRate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cough: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        runnyNose: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        headache: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        weakness: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        soreThroat: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })

    Treatment.associate = ({ status, patient }) => {
        Treatment.belongsTo(status, {
            foreignKey: {
                allowNull: false
            },
        });
        Treatment.belongsTo(patient, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
        });
    };

    return Treatment
}