<template>
  <div id="home">
    <home-nav-bar/>

    <Scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @sendScroll="handleScroll"
    :pull-up-load="true"
    @sendpullup="loadMore"
    >
      <home-swiper :banner="banner"/>
      <home-recommend :recommend="recommend"/>
      <home-feature/>
      <tab-control
      class="tab-control"
      :titles="titles"
      @tabClick = 'tabClick'/>
      <goods-list :goods="showGoods"/>
    </Scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeNavBar from './childComps/HomeNavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'


import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'


import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      titles: ['流行','新款','精选'],
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  created() {
    //请求banner和recommend数据
    this.HomeMultidata()
    //请求商品（goods）数据
    this.HomeGoods('pop')
    this.HomeGoods('new')
    this.HomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /*数据请求部分
    ****
    ****/
    //首页轮播（banner）和recommend数据
    HomeMultidata() {
      getHomeMultidata()
        .then(res => {
          // console.log(res.success);
          // console.log(res.data);
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
    },
    //首页商品数据
    HomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page)
        .then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
        
    },
    /***
    ****逻辑处理部分
    ****/
   tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    handleScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore() {
      this.HomeGoods(this.currentType)
      console.log("下拉加载");
    }
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 48px;
  height: 100vh;
  position: relative;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 48px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>