<template>
  <mt-tabbar v-model="selected" :fixed="true">
    <mt-tab-item v-for="(item, index) in items" :id="item.id" :key="index">
      <img slot="icon" :src="item.icon">
      {{ item.name }}
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    watch: {
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        this.$router.push(this.items[val].link)
      }
    },
    data() {
      return {
        selected: 1,
        items: [
          {
            id: 0,
            name: '书架',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            link: '/'
          },
          {
            id: 1,
            name: '精选',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            link: '/'
          },
          {
            id: 2,
            name: '书库',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            link: '/stackroom'
          },
          {
            id: 3,
            name: '发现',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg',
            link: '/'
          }
        ]
      }
    }
  }
</script>
