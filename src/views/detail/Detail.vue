<template>
  <div id="detail">
    <detail-nav-bar :navBarTitle='navBarTitle' />
    <Scroll class="content" ref="scroll">
      <detail-Swiper :topImages='topImages' />
      <detail-base-info :goods='GoodsInfo' />
      <detail-store-info :storeInfo="storeInfo" />
      <detail-image-info :detailImage="detailImage" />
      <detail-params-info :itemParams="itemParams" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list :goods="recommends" />
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
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, getRecommend} from 'network/detail'

import {itemListenerMixin} from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    Scroll,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailStoreInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList
  },
  data() {
    return {
      navBarTitle: ['商品','参数','评论','推荐'],
      iid: null,
      topImages: [],
      GoodsInfo: {},
      storeInfo: {},
      detailImage: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
    }
  },
  mixins: [itemListenerMixin],
  created() {
    //1.保存iid
    // 方法1：
    // this.iid = this.$route.params.iid
    // 方法2：
    this.iid = this.$route.query.iid
    //2.根据iid请求数据
    this.detailData(this.iid)
    //3.推荐数据
    this.recommend()
  },
  mounted() {
    
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImglisener)
  },
  methods: {  
    //详情页数据
     detailData(iid) {
       getDetail(iid)
        .then(res => {
          // console.log(res.result);
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
          this.itemParams = data.itemParams;
          //评论信息
          if(data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0];
          }
          
        })
     },

     recommend() {
       getRecommend()
        .then(res => {
          console.log(res);
          const date = res.data
          this.recommends = date.list
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