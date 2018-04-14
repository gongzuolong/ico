<template>
  <div v-on:scroll.passive="onScroll">
    <div id="head_bar" v-bind:style="{ background: headbar_backgroud }">
      <div id="search_box" v-on:click="toSearch"><i class="iconfont icon-sousuo"></i>{{ default_search_value }}</div>
    </div>
    <mt-swipe id="carousel" :auto="4000" :speed="500" :prevent="true">
      <mt-swipe-item class="carousel_item" v-for="(item,index) in postsData.data" :key="index">
        <img :src="item.image_url">
      </mt-swipe-item>
    </mt-swipe>

    <div id="columns">
      <div class="column" v-for="(item,index) in columns" :key="index">
        <nuxt-link :to="item.link">
          <img :src="item.src">
          <span>{{ item.text }}</span>
        </nuxt-link>
      </div>
    </div>

    <div class="one_row">
      <div class="row_title">{{ one_rows.title }}</div>
      <div class="row_items">
        <div class="row_item" v-for="(item,index) in one_rows.items" :key="index">
          <img :src="item.img">
          <span>{{ item.text1 }}</span>
          <span>{{ item.text2 }}</span>
        </div>
      </div>
    </div>

    <div class="one_row">
      <div class="row_title">{{ one_rows.title }}</div>
      <div class="row_items">
        <div class="row_item" v-for="(item,index) in one_rows.items" :key="index">
          <img :src="item.img">
          <span>{{ item.text1 }}</span>
          <span>{{ item.text2 }}</span>
        </div>
      </div>
    </div>

    <div class="one_row">
      <div class="row_title">{{ one_rows.title }}</div>
      <div class="row_items">
        <div class="row_item" v-for="(item,index) in one_rows.items" :key="index">
          <img :src="item.img">
          <span>{{ item.text1 }}</span>
          <span>{{ item.text2 }}</span>
        </div>
      </div>
    </div>

    <div class="one_row">
      <div class="row_title">{{ one_rows.title }}</div>
      <div class="row_items">
        <div class="row_item" v-for="(item,index) in one_rows.items" :key="index">
          <img :src="item.img">
          <span>{{ item.text1 }}</span>
          <span>{{ item.text2 }}</span>
        </div>
      </div>
    </div>

    <div class="one_row">
      <div class="row_title">{{ one_rows.title }}</div>
      <div class="row_items">
        <div class="row_item" v-for="(item,index) in one_rows.items" :key="index">
          <img :src="item.img">
          <span>{{ item.text1 }}</span>
          <span>{{ item.text2 }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>

<script>

  import 'static/iconfont/iconfont.css'
  import {mapState} from 'vuex'

  export default {
    head() {
      return {
        // 本页面的<head>中的<title>
        title: 'index'
      }
    },
    data() {
      return {
        headbar_backgroud: 'rgba(33, 142, 255, 0)',
        columns: [
          {
            src: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            text: '排行榜',
            link: '/search'
          },
          {
            src: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            text: '排行榜',
            link: '/search'
          },
          {
            src: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            text: '排行榜',
            link: '/search'
          },
          {
            src: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            text: '排行榜',
            link: '/search'
          },
          {
            src: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            text: '排行榜',
            link: '/search'
          }
        ],
        one_rows: {
          title: '热门小说',
          items: [
            {
              img: 'http://manga.1kxun.mobi/images/cartoons/2063-yb.jpg',
              text1: '修真聊天群',
              text2: '火力熊猫/火力熊猫'
            },
            {
              img: 'http://manga.1kxun.mobi/images/cartoons/2063-yb.jpg',
              text1: '修真聊天群',
              text2: '火力熊猫/火力熊猫'
            },
            {
              img: 'http://manga.1kxun.mobi/images/cartoons/2063-yb.jpg',
              text1: '修真聊天群',
              text2: '火力熊猫/火力熊猫'
            },
            {
              img: 'http://manga.1kxun.mobi/images/cartoons/2063-yb.jpg',
              text1: '修真聊天群',
              text2: '火力熊猫/火力熊猫'
            }
          ]
        }
      }
    },
    beforeCreate() {
      // 请求所有家族和主要人物
      this.$store.dispatch('fetchPosts')
      this.$store.commit('SET_TABBAR_SHOW', 1)
      this.$store.commit('SET_TABBAR_SELETED', 1)
    },
    mounted: function() {
      this.$nextTick(function() {
        window.addEventListener('scroll', this.onScroll)
      })
    },
    computed: {
      ...mapState([
        // 映射 this.xxx 为 store.state.xxx
        'default_search_value',
        'postsData'
      ])
    },
    methods: {
      toSearch: function(event) {
        this.$router.push('/search')
      },
      onScroll: function(event) {
        var docScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if(docScrollTop > 180) this.headbar_backgroud = 'rgba(33, 142, 255, 1)'
        else {
          var backgroud = 'rgba(33, 142, 255, 0)'
          if(docScrollTop > 20) {
            var v = 1 / ((180 - docScrollTop) / 10)
            backgroud = 'rgba(33, 142, 255, ' + v + ')'
          }
          this.headbar_backgroud = backgroud
        }
      }
    }
  }

</script>


<style scoped>
  #head_bar{
    position:fixed;
    width:100%;
    left:0px;
    top:0px;
    z-index:1;
    padding:10px 0px;
  }
  #search_box{
    margin:0px 10% 0px 20%;
    width:70%;
    height:20px;
    line-height:20px;
    padding:5px;
    background-color:#fff;
    border-radius:5px;
    opacity:1;
  }
  .title{
    margin:50px 0;
  }
  #carousel{
    width:100%;
    height:200px;
  }
  .carousel_item{
    width:100%;
    height:200px;
  }
  .carousel_item img{
    width:100%;
  }
  #columns{
    width:100%;
    margin:10px 0px;
  }
  #columns .column{
    display:inline-block;
    width:20%;
    vertical-align:middle;
    text-align:center;
  }
  #columns .column img{
    max-width:50%;
    display:block;
    margin:0px auto;
    margin-bottom:5px;
  }
  .one_row{
    width:100%;
    margin:10px 0px;
  }
  .one_row .row_title{
    width:91.25%;
    margin:0px auto;
    margin-bottom:5px;
  }
  .one_row .row_items .row_item{
    display:inline-block;
    width:25%;
    vertical-align:middle;
    text-align:center;
  }
  .one_row .row_items .row_item img{
    max-width:70%;
    display:block;
    margin:0px auto;
  }
  .one_row .row_items .row_item span{
    display:block;
    width:70%;
    margin:0px auto;
    font-size:0.7em;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .one_row .row_items .row_item :last-child{
    color:rgba(174, 179, 188, 0.56);
  }
</style>
