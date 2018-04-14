<template>
  <div id="booklistview">
    <mt-header :title="this.$route.params.name" fixed>
      <mt-button icon="back" slot="left" v-on:click="back"></mt-button>
    </mt-header>
    <div class="books">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                   :bottomAllLoaded="true" ref="loadmore">
        <div class="book" v-for="(item, index) in books" :key="index">
          <div class="bookimg">
            <img :src="item.bookimg">
          </div>
          <div class="bookinfo">
            <span class="bookname">{{ item.bookname }}</span>
            <span class="bookintro">{{ item.bookintro }} </span>
            <span class="author">{{ item.author }}</span>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {title: this.$route.params.name}
    },
    data() {
      return {
        books: [
          {
            bookimg: "https://img.qkshu.com/178/227/img120x150.jpg",
            bookname: "好色小姨",
            booklink: "https://www.qkshu.com/book/haosexiaoyi/",
            author: "作者：孤寂之狼",
            bookid: "haosexiaoyi",
            booktatus: "已完结",
            bookintro: "好色小姨是孤寂之狼写的都市生活类小说....    “小姨，我要……”“乖乖，我来了……”当你有一个漂亮的不像话，而且寂寞难耐的小姨时，你会怎么做？当这个爱你到骨子里的小姨不断的为你勾搭各种美女的时候，你会怎么做？从萝莉，到御姐，到少妇，小姨的命令统统拿下……书友群：118940557\n    ...(已完结！)(最后更新：2015-08-23)"
          },
          {
            bookimg: "https://img.qkshu.com/490/549/img120x150.jpg",
            bookname: "闪婚总裁契约妻",
            booklink: "https://www.qkshu.com/book/shzcqyq/",
            author: "作者：拈花拂柳",
            bookid: "shzcqyq",
            booktatus: "已完结",
            bookintro: "一场惊心设计，夺走了她的第一次。\n曾经恩爱甜蜜的恋情被冰冷葬送。\n“既然你已经怀孕了，那么就结婚吧。正好我不喜欢你，你也不喜欢我。”高冷邪魅的尹司宸潇洒的丢下了一纸契约：“我们只是契约夫妻。”\n顾兮兮刚要松口气，却不料那个签了契约的男人竟然无视她的抗拒，对全天下宣告他的占有权。\n尹司宸你到底要做什么？\n尹司宸邪魅...(已完结！)(最后更新：2016-12-23)"
          },
          {
            bookimg: "https://img.qkshu.com/424/936/img120x150.jpg",
            bookname: "好色艳妇",
            booklink: "https://www.qkshu.com/book/haoseyanfu/",
            author: "作者：纯情小处男",
            bookid: "haoseyanfu",
            booktatus: "连载中",
            bookintro: "你们这群好色女人，哥已经纯洁的感天动地了，你们何苦非逼着我XXOO(去看书网正在连载！)(最后更新：2015-10-30)"
          },
          {
            bookimg: "https://img.qkshu.com/001/545/img120x150.jpg",
            bookname: "王牌保镖",
            booklink: "https://www.qkshu.com/book/wangpaibaobiao/",
            author: "作者：风起天阑",
            bookid: "wangpaibaobiao",
            booktatus: "连载中",
            bookintro: "昆仑少年叶离武道入圣，医术无双，下山入世，调戏性感御姐，拯救傲娇警花，保家卫国，匡扶正义，成就一代宗师！(去看书网正在连载！)(最后更新：2017-11-09)"
          },
          {
            bookimg: "https://img.qkshu.com/003/945/img120x150.jpg",
            bookname: "男欢女爱",
            booklink: "https://www.qkshu.com/book/nanhuannvai/",
            author: "作者：久石",
            bookid: "nanhuannvai",
            booktatus: "已停更",
            bookintro: "从邻居的美艳少妇，到小卖店的新婚不久的嫩菊小媳妇，到班花朱娜，妇女主任，美女大学生村官，村长女儿，乡长夫人……一步步向上般，走了一道美女的阶梯，攀岩着更高耸的峰峦叠嶂。我们的口号是—— 横扫全村女人！读者群85685299欢迎大家加入。(已停更)(最后更新：2015-01-19)"
          },
          {
            bookimg: "https://img.qkshu.com/487/713/img120x150.jpg",
            bookname: "乡村大凶器",
            booklink: "https://www.qkshu.com/book/xiangcundaxiongqi/",
            author: "作者：日落孤城",
            bookid: "xiangcundaxiongqi",
            booktatus: "连载中",
            bookintro: "傻子龙根扮猪吃虎，占尽村里姑娘们的便宜，纵横乡野林间，独揽绮丽妖艳，成就“龙根”传说。这里有门前寡妇倚门望，有隔壁嫂子探纱窗……本书立志种马，以推倒与...(去看书网正在连载！)(最后更新：2016-09-05)"
          }
        ]
      }
    },
    beforeCreate() {
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
      loadTop() {
      },
      loadBottom() {
      },
      allLoaded() {
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
  }

  .books .book .bookinfo .author{
    font-size:0.8em;
    color:rgb(135, 135, 135);
    font-weight:600;
    position:absolute;
    left:30%;
    bottom: 15px;
  }

</style>
