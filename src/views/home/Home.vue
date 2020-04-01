<template>
  <div>
    <home-nav-bar/>
    <home-swiper :banner="banner" />
    <home-recommend :recommend="recommend" />
  </div>
</template>

<script>
import HomeNavBar from './childComps/HomeNavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'

import {getHomeMultidata} from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeNavBar,
    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banner: [],
      recommend: []
    }
  },
  created() {
    getHomeMultidata()
      .then(res => {
        // console.log(res.success);
        // console.log(res.data);
        if(res.success && res.data){
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        }
      })
  },
}
</script>

<style scoped>

</style>