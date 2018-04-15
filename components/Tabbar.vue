<template>
  <mt-tabbar v-model="selected" :fixed="true" v-if="tabbar_show == 1">
    <mt-tab-item v-for="(item, index) in items" :id="item.id" :key="index">
      <img slot="icon" :src="index == selected ? item.icon_l : item.icon_h">
      {{ item.name }}
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    watch: {
      selected: function(val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        this.$router.push(this.items[val].link)
      }
    },
    computed: {
      ...mapState([
        'tabbar_show'
      ])
    },
    created() {
      if(this.$route.path == '/') {
        this.selected = 1
        this.$store.commit('SET_TABBAR_SHOW', 1)
      }
      if(this.$route.path == '/stackroom') {
        this.selected = 2
        this.$store.commit('SET_TABBAR_SHOW', 1)
      }
      console.log('aa')
    },
    data() {
      return {
        selected: 0,
        items: [
          {
            id: 0,
            name: '书架',
            icon_h: 'static/img/icon/i_shujia_h.png',
            icon_l: 'static/img/icon/i_shujia_l.png',
            link: '/'
          },
          {
            id: 1,
            name: '精选',
            icon_h: 'static/img/icon/i_jewelry_h.png',
            icon_l: 'static/img/icon/i_jewelry_l.png',
            link: '/'
          },
          {
            id: 2,
            name: '书库',
            icon_h: 'static/img/icon/i_category_h.png',
            icon_l: 'static/img/icon/i_category_l.png',
            link: '/stackroom'
          },
          {
            id: 3,
            name: '个人',
            icon_h: 'static/img/icon/i_user_h.png',
            icon_l: 'static/img/icon/i_user_l.png',
            link: '/'
          }
        ]
      }
    }
  }
</script>
