<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-Swiper :topImages='topImages'></detail-Swiper>
    <detail-base-info :goods='GoodsInfo' />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

import {getDetail, Goods} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      GoodsInfo: {},
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
          console.log(res.result);
          //详情页轮播图数据
          const data = res.result;
          this.topImages = data.itemInfo.topImages;
          //商品数据
          this.GoodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        })
     }
  }
}
</script>

<style scoped>

</style>