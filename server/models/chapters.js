import Sequelize from 'sequelize'
import sequelize from '../dbConnect'

const tablename = 'chapters'

var _init = sequelize.define(tablename, {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  bookid: Sequelize.BIGINT,
  title: Sequelize.STRING,
  link: Sequelize.STRING,
  textfile: Sequelize.STRING,
  createdAt: Sequelize.BIGINT,
}, {
  timestamps: false,   // 不要默认时间戳
  tableName: tablename,
  indexes: [{
    name: 'bookid',
    fields: ['bookid']
  }],
  engine: 'MyISAM'
})

var _model = sequelize.model(tablename)

module.exports = {
  init: _init,
  model: _model
}
