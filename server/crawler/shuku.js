import _ from 'lodash'
import R from 'ramda'
import rp from 'request-promise'
import cheerio from 'cheerio'
import {resolve} from 'path'
import {writeFileSync} from 'fs'

var books = []
var books_jsonfile_index = 1
var books_category_index = 1
var booklist_url = 'https://www.qkshu.com/dushi/'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const getbook = async (url) => {
  const options = {
    uri: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      'Host': 'www.qkshu.com',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    },
    // agentClass: Agent,
    // agentOptions: {
    //   socksHost: 'localhost',
    //   socksPort: 1080 // 本地 VPN 的端口，这里用的 shadowsocks
    // },
    transform: body => cheerio.load(body)
  }

  console.log('开始抓取 ' + url)

  var $ = await rp(options)

  $('div#cate-list div').each(function() {
    let bookimg = $(this).find('div.bookimg a img').attr('src')
    let booklink = $(this).find('div.bookimg a').attr('href')
    let bookname = $(this).find('div.bookinfo .bookname a').text()
    let author = $(this).find('div.bookinfo .author').text()
    const data = {
      bookimg,
      bookname,
      booklink,
      author
    }

    books.push(data)
  })

  await sleep(1000)

  let next = $('div.listpage .right a')
  if(next.text() == '下一页') {
    let nexthref = next.attr('href')
    if(nexthref) {
      getbook(`https://www.qkshu.com/dushi/${nexthref}`)
    } else {
      let jsonSavePath = resolve(__dirname, `data/books.json`)
      const filterBook = R.compose(
        R.map((data) => {
          data.bookid = data.booklink.match(/\/book\/(.*?)\//)[1]
          return data
        }),
        R.filter(data => data.bookimg && data.bookname && data.booklink && data.author)
      )

      books = filterBook(books)
      writeFileSync(jsonSavePath, JSON.stringify(books, null, 2))
      console.log(`write to ${jsonSavePath} ok`)
    }

  }

}

//getbook(booklist_url)

export const getbookchapters = async () => {
  let booksPath = resolve(__dirname, 'data/books.json')
  let chaptersPath = resolve(__dirname, 'data/chapters.json')
  let books = require(booksPath)

  let chapters = []

  for(let i = 0; i < books.length; i++) {

    const options = {
      uri: books[i].booklink,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        'Host': 'www.qkshu.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      },
      transform: body => cheerio.load(body)
    }

    console.log(`开始抓取${books[i].booklink}`)
    var $ = await rp(options)

    let chapter = _.assign({bookid: books[i].bookid})

    books[i].booktatus = $('div#bookimg .status_text').text()
    books[i].bookintro = $('div#des').text()
    chapter.chapters = []

    $('div#list ul li').each(function() {
      let name = $(this).find('a').text()
      let link = books[i].booklink + $(this).find('a').attr('href')
      const chapterdata = {
        name,
        link
      }
      chapter.chapters.push(chapterdata)
    })

    chapters.push(chapter)

    await sleep(500)
  }

  console.log('开始写入')
  writeFileSync(booksPath, JSON.stringify(books, null, 2))
  writeFileSync(chaptersPath, JSON.stringify(chapters, null, 2))
}

getbookchapters()
