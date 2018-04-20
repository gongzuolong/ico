import Sequelize from 'sequelize'

const sequelize = new Sequelize('ibook', '83c395cd', '730ebcd6b5394f7ee71b9ddec3b945fa', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize
