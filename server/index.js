import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import conf from './config'

const app = new Koa()

const start = async () => {
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  const nuxt = await new Nuxt(config)

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(conf.port, conf.host)
  console.log('Server listening on ' + conf.host + ':' + conf.port) // eslint-disable-line no-console
}
start()
