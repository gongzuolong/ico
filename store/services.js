import axios from 'axios'
import _ from 'lodash'
import allbooks from '../server/crawler/data/books'

const allchapters = require('../server/crawler/data/chapters')

const baseUrl = 'http://api.en.dailymanga.mobi'

class Services {
  poster() {
    return axios.get(`${baseUrl}/api/home/getPosterList?_brand=web`)
  }

  books(page) {
    var data = _.slice(allbooks, page * 20, page * 20 + 20)
    return data
  }

  findbookbyid(bookid) {
    var data = _.find(allbooks, {bookid: bookid})
    return data
  }

  findchaptersbybookid(bookid) {
    var data = _.find(allchapters, {bookid: bookid})
    if(data) return data.chapters
    else return []
  }

  tags(categoryId) {
    if(categoryId == 1 || !categoryId) {
      return [
        {
          tagid: 1,
          name: '都市',
          icon: 'static/img/tag/tag1.jpg',
          number: '1000册'
        },
        {
          tagid: 2,
          name: '玄幻',
          icon: 'static/img/tag/tag2.jpg',
          number: '1000册'
        },
        {
          tagid: 3,
          name: '仙侠',
          icon: 'static/img/tag/tag3.jpg',
          number: '1000册'
        },
        {
          tagid: 4,
          name: '历史',
          icon: 'static/img/tag/tag4.jpg',
          number: '1000册'
        },
        {
          tagid: 5,
          name: '科幻',
          icon: 'static/img/tag/tag5.jpg',
          number: '1000册'
        },
        {
          tagid: 6,
          name: '悬疑',
          icon: 'static/img/tag/tag6.jpg',
          number: '1000册'
        }
      ]
    } else return []
  }
}

export default new Services()
