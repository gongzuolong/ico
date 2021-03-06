import Koa from 'koa'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import {Nuxt, Builder} from 'nuxt'
import conf from './config'
import cors from 'koa2-cors'
//import Route from './routers'
import Router from 'koa-router'

import books from './models/books'
import chapters from './models/chapters'
import redis from 'redis'
import redisStore from 'koa-redis'
//import dbinit from './dbInit'

const app = new Koa()
var router = new Router()
const app_path = resolve(__dirname, '../')
var redis_client = redis.createClient()
var store = redisStore({client: redis_client, db: 0})


const loadbooklist = async () => {
  let rows = await books.model.findAll()
  for(let i = 0; i < rows.length; i++) {
    let data = {
      bookid: rows[i].id,
      bookname: rows[i].title,
      bookintro: rows[i].intro,
      bookimg: rows[i].img,
      author: rows[i].author
    }
    redis_client.rpush('list_page', JSON.stringify(data), (err, reply) => {
    })
  }
}

//loadbooklist()

app.use(cors({
  origin: function(ctx) {
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.get('/api/book/list/:page', async (ctx, next) => {
  let res = {data: []}
  let redis_key = 'list_page'
  let limit = 20
  let start = ctx.params.page * limit
  let end = start + limit - 1

  let lists = await store.client.lrange(redis_key, start, end)
  for(let i = 0; i < lists.length; i++) {
    let data = JSON.parse(lists[i])
    res.data.push(data)
  }
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.body = res
})

router.get('/api/book/detail/:id', async (ctx, next) => {
  let res = {data: {}}
  let {dataValues} = await books.model.findById(ctx.params.id)
  res.data = dataValues
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.body = res
})

router.get('/api/book/chapter/:id', async (ctx, next) => {
  let res = {data: []}
  let rows = await chapters.model.findAll({where: {bookid: ctx.params.id}, order: [['id', 'asc']], limit: 10})
  for(let i = 0; i < rows.length; i++) {
    let data = {
      name: rows[i].title,
      id: rows[i].id
    }
    res.data.push(data)
  }
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.body = res
})

router.get('/api/book/content/:id', async (ctx, next) => {
  let res = {data: {}}
  let {dataValues} = await chapters.model.findById(ctx.params.id)
  res.data.content = readFileSync(app_path + dataValues.textfile, {encoding: 'utf8'})
  res.data.title = dataValues.title
  res.data.bookid = dataValues.bookid
  res.data.id = dataValues.id
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.body = res
})

router.get('/api/book/next_content/:bookid/:id', async (ctx, next) => {
  let res = {data: {}}
  let {dataValues} = await chapters.model.findOne({where: {bookid: ctx.params.bookid, id: {$gt: ctx.params.id}}})
  res.data.content = readFileSync(app_path + dataValues.textfile, {encoding: 'utf8'})
  res.data.title = dataValues.title
  res.data.bookid = dataValues.bookid
  res.data.id = dataValues.id
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.body = res
})

app.use(router.routes())
app.use(router.allowedMethods())

const start = async () => {
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  const nuxt = await new Nuxt(config)

  if(config.dev) {
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

  //await dbinit()

  // const booksdata = require('./crawler/data/books')
  //
  // for(let i = 0; i < booksdata.length; i++) {
  //   books.model.create({
  //     title: booksdata[i].bookname,
  //     py_title: booksdata[i].bookid,
  //     author: booksdata[i].author,
  //     img: booksdata[i].bookimg,
  //     status: 0,
  //     finish: 0,
  //     link: booksdata[i].booklink
  //   })
  // }


}
start()



