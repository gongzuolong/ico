<template>
  <div>
    <mt-header title="搜索" fixed >
      <mt-button icon="back" slot="left" v-on:click="back"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-search id="search_box" v-model="search_value" cancel-text="取消" :placeholder="default_search_value"></mt-search>
  </div>
</template>


<script>
  import 'static/iconfont/iconfont.css'
  import { mapState } from 'vuex'

  export default {
    head() {
      return {title: 'search'}
    },
    data() {
      return {
        search_value: ''
      }
    },
    beforeCreate() {
      this.$store.commit('SET_TABBAR_SHOW', 0)
    },
    computed: {
      ...mapState([
        // 映射 this.xxx 为 store.state.xxx
        'default_search_value'
      ])
    },
    methods: {
      back: function(event) {
        history.go(-1)
      }
    }
  }
</script>

<style scoped>
  #search_box{
    margin-top:40px;
  }

</style>
