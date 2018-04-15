<template>
  <div>
    <mt-header :title="book.bookname" fixed>
      <mt-button icon="back" slot="left" v-on:click="back"></mt-button>
    </mt-header>

    <div id="booktop">
      <div class="bookimg">
        <img :src="book.bookimg">
      </div>
      <div class="bookinfo">
        <span class="bookname">{{ book.bookname }}</span>
        <span class="bookauthor">{{ book.author }}</span>
      </div>
    </div>

    <div id="bookintro">
      {{ book.bookintro }}
    </div>

    <div class="loadmoreicon" v-if="is_loading_chapters">
      <div class="loadmoreicon_icon">
        <mt-spinner type="double-bounce" color="rgb(33, 142, 255)" :size="25"></mt-spinner>
      </div>
    </div>

    <mt-cell v-for="(item, index) in chapters" :title="item.name" :key="index" is-link></mt-cell>
  </div>
</template>

<script>
  import Services from '../../store/services'

  export default {
    head() {
      return {
        title: this.book.bookname
      }
    },
    created() {
      this.$store.commit('SET_TABBAR_SHOW', 0)
      this.book = Services.findbookbyid(this.$route.params.id)
      setTimeout(async () => {
        this.chapters = await Services.findchaptersbybookid(this.$route.params.id)
        this.is_loading_chapters = false
      }, 100)
    },
    methods: {
      back() {
        history.go(-1)
      }
    },
    data() {
      return {
        book: {},
        chapters: [],
        is_loading_chapters: true
      }
    }
  }
</script>

<style scoped>
  #booktop{
    width:100%;
    padding-top:55px;
  }
  #booktop .bookimg{
    display:inline-block;
    width:40%;
    text-align:center;
  }
  #booktop .bookimg img{
    width:80%;
  }
  #booktop .bookinfo{
    display:inline-block;
    width:58%;
    vertical-align:top;
  }
  #booktop .bookinfo .bookname{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
    font-size:1em;
    color:#333;
    margin-bottom:15px;
    font-weight:600;
  }
  #booktop .bookinfo .bookauthor{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
    font-size:0.8em;
    color:rgb(135, 135, 135);
    font-weight:600;
  }
  #bookintro{
    width:auto;
    padding:10px 10px;
    text-align:justify;
    font-size:0.8em;
    color:rgb(135, 135, 135);
    font-weight:600;
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
