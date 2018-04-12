import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    default_search_value: '搜索默认词',
    postsData: {}
  },
  mutations,
  actions
})
export default store
