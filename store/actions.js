import Services from './services'

export default {

  async fetchPosts({ state }) {
    const res = await Services.poster()
    state.postsData = res.data
  },
  async fetchTags({ state }, categoryId) {
    const res = await Services.tags(categoryId)
    state.tags = res
  }
}
