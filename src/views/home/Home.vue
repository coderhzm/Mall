<template>
  <div id="home">
    <home-nav-bar/>
    <tab-control
      :titles="titles"
      @tabClick = 'tabClick'
      ref="tabcontrolA"
      class = "is-tab-control"
      v-show="isTabShow"/>
      
    <Scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @sendScroll="handleScroll"
    :pull-up-load="true"
    @sendpullup="loadMore"
    >
      <home-swiper :banner="banner" @swiperimageload='swiperimageload' />
      <home-recommend :recommend="recommend"/>
      <home-feature/>
      <tab-control
      :titles="titles"
      @tabClick = 'tabClick'
      ref="tabcontrolB"/>
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
import {itemListenerMixin} from 'common/mixin'

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY: 0,
    }
  },
  mixins: [itemListenerMixin],
  created() {
    // console.log("home创建");
    //请求banner和recommend数据
    this.HomeMultidata()
    //请求商品（goods）数据
    this.HomeGoods('pop')
    this.HomeGoods('new')
    this.HomeGoods('sell')
  },
  mounted() {
    
  },
  //activated和deactivated钩子函数记录位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 300)
    this.$refs.scroll.refresh()
    // console.log("设置位置"+this.saveY);
  },
  deactivated() {
    //1.保存屏幕y值
    this.saveY = this.$refs.scroll.getCurrentY()
    // console.log("记录位置"+this.saveY);
    
    //2.取消全局事件
    this.$bus.$off("itemImageLoad", this.itemImglisener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /***
    ****数据请求部分
    ****/
    //首页轮播（banner）和recommend数据
    HomeMultidata() {
      getHomeMultidata()
        .then(res => {
          // console.log(res.success);
          // console.log(res.data);
          // if(res.success && res.data) {
            this.banner = res.data.banner.list
            this.recommend = res.data.recommend.list
          // }
        })
    },
    //首页商品数据
    HomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page)
        .then(res => {
          // if(res.success && res.data) {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
          // }
          //完成加载更多
          this.$refs.scroll.finishPullUp()
        })
        
    },
    /***
    ****逻辑处理部分
    ****/
  //判断展示的goods
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
      this.$refs.tabcontrolA.currentIndex = index
      this.$refs.tabcontrolB.currentIndex = index
    },
    //BackTop
    //回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    //获取tab-control的offetTop高度
    swiperimageload() {
      this.tabOffsetTop = this.$refs.tabcontrolB.$el.offsetTop
    },
    handleScroll(position) {
      //是否显示
      this.isShowBackTop = (-position.y) > this.tabOffsetTop
      //BackTop是否吸顶
      this.isTabShow = (-position.y) > this.tabOffsetTop
    },
    
    //上拉加载更多
    loadMore() {
      this.HomeGoods(this.currentType)
    },

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
.is-tab-control {
  position: relative;
  z-index: 9;
}
</style>