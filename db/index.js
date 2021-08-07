const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'wall',
    'root',
    'q5063743',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

const Bricks = require('./Bricks')(sequelize)

module.exports = {
    sequelize: sequelize,
    bricks: Bricks
}
