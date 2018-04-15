import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    default_search_value: '搜索默认词',
    tabbar_show: 1,
    tabbar_seleted: 1,
    postsData: [],
    tags: [],
    books: []
  },
  mutations,
  actions
})
export default store
