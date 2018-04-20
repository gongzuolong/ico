import axios from 'axios'
import _ from 'lodash'

const baseUrl = 'http://api.en.dailymanga.mobi'

class Services {
  poster() {
    return axios.get(`${baseUrl}/api/home/getPosterList?_brand=web`)
  }

  books(page) {
    return axios.get(`http://47.98.201.35/:3000/api/book/list/${page}`)
  }

  findbookbyid(bookid) {
    return axios.get(`http://47.98.201.35:3000/api/book/detail/${bookid}`)
  }

  findchaptersbybookid(bookid) {
    return axios.get(`http://47.98.201.35:3000/api/book/chapter/${bookid}`)
  }

  getContent(id) {
    return axios.get(`http://47.98.201.35:3000/api/book/content/${id}`)
  }

  getNextContent(bookid, id) {
    return axios.get(`http://47.98.201.35:3000/api/book/next_content/${bookid}/${id}`)
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
