import fs from 'fs'
import path from 'path'


var main = function() {
  const models = fs.readdirSync(__dirname + '/models')
  models.forEach((fileName) => {
    let modelname = path.parse(fileName).name
    let model_file_path = path.resolve('server/models', modelname)
    let model = require(model_file_path)
    model.init.sync({
      force: true
    })
  })
}

module.exports = main
