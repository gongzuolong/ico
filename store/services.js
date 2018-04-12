import axios from 'axios'

const baseUrl = 'http://api.en.dailymanga.mobi'

class Services {
  poster() {
    return axios.get(`${baseUrl}/api/home/getPosterList?_brand=web`)
  }
}

export default new Services()
