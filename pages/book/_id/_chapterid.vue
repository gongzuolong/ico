<template>
  <div id="content_box" :style="{maxHeight:maxHeight}">
    <mt-header :title="title" :style="{ opacity: opacity }" fixed>
      <mt-button icon="back" slot="left" v-on:click="back"></mt-button>
    </mt-header>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="上拉加载下一章节"
                 @bottom-status-change="bottomChange" ref="loadmore">

      <div v-for="(item,index) in contents" :key="index" @click="contentclick">
        <div class="title">{{ item.title }}</div>
        <div class="content" v-html="item.data"></div>
      </div>

    </mt-loadmore>

  </div>
</template>

<script>
  import Services from '../../../store/services'

  export default {
    head() {
      return {
        title: this.title
      }
    },
    async beforeCreate() {
      this.$store.commit('SET_TABBAR_SHOW', 0)
      let row = await Services.getContent(this.$route.params.chapterid)
      let content = row.data.data.content.replace(/\n/g, "<div class='hang' style='height:8px'></div>")
      this.title = row.data.data.title
      this.bookid = row.data.data.bookid
      this.current_id = row.data.data.id
      this.contents.push({title: row.data.data.title, data: content})
      this.maxHeight = window.screen.height - 5 + 'px'
    },
    methods: {
      back() {
        history.go(-1)
      },
      contentclick() {
        this.opacity = this.opacity == 0 ? 1 : 0
      },
      bottomChange(status) {
        console.log(status)
      },
      async loadBottom() {
        console.log('loadbottom')
        let row = await Services.getNextContent(this.bookid, this.current_id)
        let content = row.data.data.content.replace(/\n/g, "<div class='hang' style='height:5px'></div>")
        this.title = row.data.data.title
        this.current_id = row.data.data.id
        this.contents.push({title: row.data.data.title, data: content})
        this.$refs.loadmore.onBottomLoaded()
        setTimeout(function() {
          let addHeight = window.screen.height

          function slowScroll(addHeight) {
            if(addHeight < 15) {
              return
            }
            setTimeout(function() {
              let scrollTop = document.getElementById('content_box').scrollTop + 15
              document.getElementById('content_box').scrollTop = scrollTop
              slowScroll(addHeight - 15)
            }, 10)
          }

          slowScroll(addHeight)
        }, 100)
      }
    },
    data() {
      return {
        contents: [],
        bookid: 0,
        current_id: 1,
        title: '',
        opacity: 0,
        topStatus: '',
        allLoaded: false,
        maxHeight: '0px'
      }
    }
  }
</script>

<style scoped>
  #content_box{
    overflow-y:scroll;
  }
  .content{
    padding:15px;
    text-align:justify;
  }
  .title{
    padding-top:15px;
    font-size:1.5em;
    font-weight:700;
  }
  .header{
    opacity:0;
  }
</style>
