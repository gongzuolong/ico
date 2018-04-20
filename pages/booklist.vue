<template>
  <div id="booklistview">
    <mt-header :title="this.$route.params.name" fixed>
      <mt-button icon="back" slot="left" v-on:click="back"></mt-button>
    </mt-header>
    <div class="books" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <nuxt-link v-for="(item, index) in books" :key="index" :to="{ path:'/book/' + item.bookid }">
      <div class="book">
        <div class="bookimg">
          <img :src="item.bookimg">
        </div>
        <div class="bookinfo">
          <span class="bookname">{{ item.bookname }}</span>
          <span class="bookintro">{{ item.bookintro }} </span>
          <span class="author">{{ item.author }}</span>
        </div>
      </div>
      </nuxt-link>

      <div class="loadmoreicon" v-if="loading && !isend">
        <div class="loadmoreicon_icon">
          <mt-spinner type="fading-circle" color="rgb(33, 142, 255)" :size="25"></mt-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Services from '../store/services'
  import {Toast} from 'mint-ui'

  let loadpage = 0

  export default {
    head() {
      return {title: this.$route.params.name}
    },
    computed: {
      ...mapState([
        'books'
      ])
    },
    data() {
      return {
        loading: false,
        isend: false
      }
    },
    beforeCreate() {
      if(loadpage == 0) {
        this.$store.dispatch('fetchBooks', 0)
        loadpage++
      }
      this.$store.commit('SET_TABBAR_SHOW', 0)
    },
    validate({params}) {
      // Must be a number
      return true
    },
    methods: {
      back() {
        history.go(-1)
      },
      loadMore() {
        if(this.loading) return false
        this.loading = true
        setTimeout(async () => {
          let row = await Services.books(loadpage)
          this.$store.commit('SET_BOOKS', this.books.concat(row.data.data))
          loadpage++
          if(row.data.data.length == 20) {
            this.loading = false
          } else {
            this.isend = true
            Toast({message: '已全部加载完成', duration: 3000})
          }
        }, 500)
      }
    }
  }
</script>

<style scoped>
  #booklistview{
    background-color:#dedede;
  }
  .books{
    margin-top:45px;
    width:100%;
  }
  .books .book{
    background-color:#fff;
    margin-bottom:5px;
    position:relative;
  }
  .books .book .bookimg{
    display:inline-block;
    width:30%;
    text-align:center;
    vertical-align:middle;
    padding:10px 0px;
  }
  .books .book .bookimg img{
    width:70%;
  }
  .books .book .bookinfo{
    display:inline-block;
    width:67%;
    vertical-align:top;
    padding-top:12px;
  }
  .books .book .bookinfo span{
    display:block;
  }
  .books .book .bookinfo .bookname{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
    font-size:1em;
    color:#333;
    margin-bottom:5px;
    font-weight:600;
  }
  .books .book .bookinfo .bookintro{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    font-size:0.7em;
    color:rgb(135, 135, 135);
    font-weight:600;
    line-height:1.4em;
  }
  .books .book .bookinfo .author{
    font-size:0.8em;
    color:rgb(135, 135, 135);
    font-weight:600;
    position:absolute;
    left:30%;
    bottom:15px;
  }
  .loadmoreicon{
    margin-top:-5px;
    background-color:#fff;
    width:100%;
    text-align:center;
  }
  .loadmoreicon .loadmoreicon_icon{
    width:25px;
    margin:0px auto;
  }
</style>
