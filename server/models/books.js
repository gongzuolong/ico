import Sequelize from 'sequelize'
import sequelize from '../dbConnect'

const tablename = 'books'

var _init = sequelize.define(tablename, {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,  // 标题
  py_title: Sequelize.STRING,  // 详细内容
  author: Sequelize.STRING,  // 级别
  img: Sequelize.STRING,  // 承接人
  intro: Sequelize.STRING(500), // 负责人
  status: Sequelize.TINYINT, // 开始时间
  finish: Sequelize.TINYINT, // 计划完成时间
  link: Sequelize.STRING, // 实际完成时间
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
}, {
  timestamps: false,   // 不要默认时间戳
  tableName: tablename,
  engine: 'MyISAM'
})

var _model = sequelize.model(tablename)

module.exports = {
  init: _init,
  model: _model
}
