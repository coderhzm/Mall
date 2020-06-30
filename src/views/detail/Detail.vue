<template>
  <div id="detail">
    <detail-nav-bar :navBarTitle='navBarTitle' />
    <Scroll class="content">
      <detail-Swiper :topImages='topImages' />
      <detail-base-info :goods='GoodsInfo' />
      <detail-store-info :storeInfo="storeInfo" />
      <detail-image-info :detailImage="detailImage" />
      <detail-params-info :itemParams="itemParams" />
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailStoreInfo from './childComps/DetailStoreInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    Scroll,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailStoreInfo,
    DetailImageInfo,
    DetailParamsInfo
  },
  data() {
    return {
      navBarTitle: ['商品','参数','评论','推荐'],
      iid: null,
      topImages: [],
      GoodsInfo: {},
      storeInfo: {},
      detailImage: {},
      itemParams: {}
    }
  },
  created() {
    //1.保存iid
    // 方法1：
    // this.iid = this.$route.params.iid
    // 方法2：
    this.iid = this.$route.query.iid
    //2.根据iid请求数据
    this.detailData(this.iid)
  },
  methods: {  
    //详情页数据
     detailData(iid) {
       getDetail(iid)
        .then(res => {
          console.log(res.result);
          const data = res.result;
          //详情页轮播图数据
          this.topImages = data.itemInfo.topImages;
          //商品数据
          this.GoodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          //店铺信息
          this.storeInfo = data.shopInfo;
          //详情信息图片
          this.detailImage = data.detailInfo;
          //商品参数信息
          this.itemParams = data.itemParams
        })
     }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.content {
  background-color: #fff;

  position: absolute;
  top: 44px;
  bottom: 48px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>