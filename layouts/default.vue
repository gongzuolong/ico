<template>
  <div>
    <nuxt/>
    <MyTabbar v-if="tabbar_show == 1"/>
  </div>
</template>

<script>
  import MyTabbar from '../components/Tabbar.vue'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState([
        // 映射 this.xxx 为 store.state.xxx
        'tabbar_show'
      ])
    },
    components: {
      MyTabbar
    }
  }
</script>

<style>
  .container{
    margin:0;
    width:100%;
    padding:100px 0;
    text-align:center;
  }
  .button, .button:visited{
    display:inline-block;
    color:#3b8070;
    letter-spacing:1px;
    background-color:#fff;
    border:2px solid #3b8070;
    text-decoration:none;
    text-transform:uppercase;
    padding:15px 45px;
  }
  .button:hover, .button:focus{
    color:#fff;
    background-color:#3b8070;
  }
  .title{
    color:#505153;
    font-weight:300;
    font-size:2.5em;
    margin:0;
  }
</style>
