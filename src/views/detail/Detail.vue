<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-Swiper :topImages='topImages'></detail-Swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    //1.保存iid
    this.iid = this.$route.params.iid
    //2.根据iid请求数据
    this.detailData(this.iid)
  },
  methods: {  
    //详情页数据
     detailData(iid) {
       getDetail(iid)
        .then(res => {
          console.log(res);
          //详情页轮播图数据
          const data = res.result;
          this.topImages = data.itemInfo.topImages
        })
     }
  }
}
</script>

<style scoped>

</style>