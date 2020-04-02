<template>
  <div>
    <home-nav-bar/>
    <home-swiper :banner="banner"/>
    <home-recommend :recommend="recommend"/>
    <home-feature/>
    <home-tab-control/>
    

    <div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import HomeNavBar from './childComps/HomeNavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'
import HomeTabControl from './childComps/HomeTabControl'

import { getHomeMultidata, getHomeGoods } from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    HomeTabControl
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
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
  methods: {
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
        })
    }
  }
}
</script>

<style scoped>

</style>