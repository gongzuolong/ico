<template>
  <div>
    <mt-header title="分类" fixed>
      <mt-button slot="right" @click="$router.push('/search')"><i class="iconfont icon-sousuo tu"></i></mt-button>
    </mt-header>

    <div id="category">
      <div class="category_item" v-for="(item,index) in category_items" :key="index"
           :class="[ index == category_seleted_index ? 'selected':'' ]" @click=select_category(index)>
        {{ item.name }}
      </div>
    </div>

    <div id="tags" v-if="tags.length > 0">
      <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore"
                   :bottomAllLoaded="true">
        <div class="tag_item" v-for="(item, index) in tags" :key="index">
          <nuxt-link :to="{name:'booklist',params:{id:item.tagid,name:item.name}}">
            <div class="tag_icon"><img :src="item.icon"></div>
            <div class="tag_text">
              <span class="name">{{ item.name }}</span>
              <span class="number">{{ item.number }}</span>
            </div>
          </nuxt-link>
        </div>

        <!--<div slot="top" class="mint-loadmore-top">-->
        <!--<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>-->
        <!--<span v-show="topStatus === 'loading'">Loading...</span>-->
        <!--</div>-->
      </mt-loadmore>
    </div>
  </div>
</template>


<script>
  import 'static/iconfont/iconfont.css'
  import {mapState} from 'vuex'

  export default {
    head() {
      return {title: '书库'}
    },
    data() {
      return {
        category_seleted_index: 0,
        category_items: [
          {
            name: '男生'
          },
          {
            name: '女生'
          },
          {
            name: '出版'
          }
        ],
        topStatus: 'drop'
      }
    },
    beforeCreate() {
      this.$store.dispatch('fetchTags')
      this.$store.commit('SET_TABBAR_SHOW', 1)
      this.$store.commit('SET_TABBAR_SELETED', 2)
    },
    computed: {
      ...mapState([
        // 映射 this.xxx 为 store.state.xxx
        'tags'
      ])
    },
    methods: {
      select_category(index) {
        this.category_seleted_index = index
        this.$store.dispatch('fetchTags', index + 1)
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom() {
        console.log('loadbottom')
      },
      allLoaded() {
        console.log('allloaded')
      }
    }
  }
</script>

<style scoped>
  #category{
    position:fixed;
    width:25%;
    top:40px;
    height:100%;
    background:rgba(171, 166, 171, 0.2);
  }
  #category .category_item{
    padding:15px 0px;
    font-size:1em;
    font-weight:600;
    text-align:center;
    border-bottom:3px solid #fff;
  }
  #category .selected{
    background:rgba(255, 255, 255, 1);
    border-left:5px solid rgb(33, 142, 255);
    color:rgb(33, 142, 255)
  }
  #tags{
    position:fixed;
    right:0px;
    top:40px;
    bottom:0px;
    width:75%;
    background:rgba(255, 255, 255, 0.2);
    overflow-y:scroll;
  }
  #tags .tag_item{
    display:inline-block;
    width:50%;
    height:50px;
    vertical-align:middle;
    padding:10px 0px;
    margin-bottom:5px;
  }
  #tags .tag_item .tag_icon{
    display:inline-block;
    width:30%;
    vertical-align:middle;
    padding-left:15%;
  }
  #tags .tag_item .tag_icon img{
    width:100%;
  }
  #tags .tag_item .tag_text{
    display:inline-block;
    vertical-align:middle;
    margin-left:10px;
  }
  #tags .tag_item .tag_text .name{
    display:block;
    font-size:0.8em;
    font-weight:600;
  }
  #tags .tag_item .tag_text .number{
    display:block;
    font-size:0.8em;
    color:#dedede;
  }
</style>
