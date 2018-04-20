import _ from 'lodash'
import {resolve} from 'path'

const host = process.env.HOST || '0.0.0.0'
const env = process.env.NOOD_ENV || 'development'
const conf = require(resolve(__dirname, `${env}.json`))

export default _.assign({
  host,
  env
}, conf)
