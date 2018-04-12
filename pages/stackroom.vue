<template>
  <div>
    <mt-header title="书库" fixed>
      <mt-button slot="right" @click="$router.push('/search')"><i class="iconfont icon-sousuo tu"></i></mt-button>
    </mt-header>

    <div id="category">
      <div class="category_item" v-for="(item,index) in category_items" :key="index"
           :class="[ index == category_seleted_index ? 'selected':'' ]" @click=select_category(index)>
        {{ item.name }}
      </div>
    </div>

    <div id="tags">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomAllLoaded="true">
        <ul>
          <li v-for="item in list">{{ item }}</li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>


<script>
  import 'static/iconfont/iconfont.css'

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
        list: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,11,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      }
    },
    methods: {
      select_category(index) {
        this.category_seleted_index = index
      },
      loadTop() {

      },
      loadBottom() {

      },
      allLoaded() {

      },
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
  }

  #tags{
    position:fixed;
    right:0px;
    top: 40px;
    bottom:0px;
    width:75%;
    min-height:100%;
    background:rgba(255, 255, 255, 0.2);
    overflow-y:scroll;
  }
</style>
