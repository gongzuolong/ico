import Router from 'koa-router'

export class Routess {
  constructor(app) {
    this.app = app
    this.router = new Router()
  }

  init() {
    this.router.get('/api/xxx', (ctx, next) => {
      ctx.body = 'aaaaaa'
      next()
    })

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}
