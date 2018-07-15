import _ from 'lodash'
import R from 'ramda'
import rp from 'request-promise'
import cheerio from 'cheerio'
import {resolve} from 'path'
import {writeFileSync, existsSync, mkdirSync} from 'fs'
import books from '../models/books'
import chapters from '../models/chapters'

//var books = []
var books_jsonfile_index = 1
var books_category_index = 1
var booklist_url = 'https://www.qkshu.com/dushi/'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
  'Host': 'www.qkshu.com',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
}
var fetch_flag = false
const textfile_dir = resolve(__dirname, '../../')


export const getChapterContent = async (url) => {
  const options = {
    uri: url,
    headers: headers,
    // agentClass: Agent,
    // agentOptions: {
    //   socksHost: 'localhost',
    //   socksPort: 1080 // 本地 VPN 的端口，这里用的 shadowsocks
    // },
    transform: body => cheerio.load(body)
  }

  console.log('开始抓取 ' + url)

  var $ = await rp(options)
  var p = []
  $('div#content p').each(function() {
    p.push($(this).text())
  })

  return p.join("\n")
}


export const run = async () => {
  let rows = await chapters.model.findAll({where: {textfile: null}, order: [['id', 'asc']], limit: 10})
  if(rows.length == 0) return
  for(let i = 0; i < rows.length; i++) {
    let content = await getChapterContent(rows[i].link)
    let textfile = `/txt/${rows[i].bookid}/${rows[i].id}.txt`
    if(existsSync(`${textfile_dir}/txt/${rows[i].bookid}`) == false) {
      mkdirSync(`${textfile_dir}/txt/${rows[i].bookid}`)
    }
    writeFileSync(textfile_dir + textfile, content)
    await chapters.model.update({textfile: textfile}, {where: {id: rows[i].id}, fields: ['textfile']})
  }
  run()
}

run()

//getChapterContent('https://www.qkshu.com/book/laopoxihuancangmimi/10010.html')

// books.init.sync({
//   force: true
// })
// chapters.init.sync({
//   force: true
// })

//getbook(booklist_url)

// export const getbookchapters = async () => {
//
//   var offset = 210
//   var limit = 10
//
//   while(true) {
//     let {rows} = await books.model.findAndCountAll({
//       limit: limit,
//       offset: offset
//     })
//     if(rows.length == 0) break
//     offset += limit
//
//     for(let i = 0; i < rows.length; i++) {
//       const options = {
//         uri: rows[i].link,
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
//           'Host': 'www.qkshu.com',
//           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
//         },
//         transform: body => cheerio.load(body)
//       }
//
//       console.log(`开始抓取${rows[i].link}`)
//       var $ = await rp(options)
//
//       let finish = $('div#bookimg .status_text').text() == "已完结" ? 1 : 0
//       let intro = $('div#des').text()
//
//       books.model.update({finish: finish, intro: intro}, {where: {id: rows[i].id}, fields: ['finish', 'intro']})
//
//       chapters.model.destroy({where: {bookid: rows[i].id}})
//
//       $('div#list ul li').each(function() {
//         let name = $(this).find('a').text()
//         let link = rows[i].link + $(this).find('a').attr('href')
//         chapters.model.create({
//           bookid: rows[i].id,
//           title: name,
//           link: link
//         })
//       })
//
//       console.log(`${rows[i].title} 章节信息save`)
//
//     }
//
//     console.log(`------offset:${offset}--------`)
//
//   }
//
// }

//getbookchapters()
