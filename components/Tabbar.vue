<template>
  <mt-tabbar v-model="selected" :fixed="true">
    <mt-tab-item v-for="(item, index) in items" :id="item.name" :key="index">
      <img slot="icon" :src="item.icon">
      {{ item.name }}
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    data() {
      return {
        selected: '',
        items: [
          {
            name: '书架',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg'
          },
          {
            name: '精选',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg'
          },
          {
            name: '书库',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg'
          },
          {
            name: '发现',
            icon: 'http://manga.1kxun.mobi/images/mycenter/20-2faef5f42ec1906ff809ffed9f1bb2bb.jpg'
          }
        ]
      }
    }
  }
</script>
