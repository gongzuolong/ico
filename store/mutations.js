export default {
  SET_DEFAULT_SEARCH_VALUE: (state, value) => {
    state.default_search_value = value
  },
  SET_TABBAR_SHOW: (state, value) => {
    state.tabbar_show = value
  },
  SET_TABBAR_SELETED: (state, value) => {
    state.tabbar_seleted = value
  },
  SET_BOOKS: (state, value) => {
    state.books = value
  },
  SET_CACHE_CHAPTERS: (state, value) => {
    state.cache_chapters = value
  },
  SET_CACHE_BOOK: (state, value) => {
    state.cache_book = value
  }
}
