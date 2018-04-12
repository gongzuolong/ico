import Services from './services'

export default {

  async fetchPosts({ state }) {
    const res = await Services.poster()
    state.postsData = res.data
  }
}
