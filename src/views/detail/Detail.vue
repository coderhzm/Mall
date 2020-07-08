<template>
  <div id="detail">
    <detail-nav-bar :nav-bar-title='navBarTitle' @titleClick="titleClick" ref="navBar" />
    <Scroll class="content" ref="scroll" :probeType='3' @sendScroll="contentScroll">
      <detail-Swiper :top-images='topImages' />
      <detail-base-info :goods='GoodsInfo' ref="baseInfo" />
      <detail-store-info :store-info="storeInfo" />
      <detail-image-info :detail-image="detailImage" @detailImageload="detailImageload" />
      <detail-params-info ref="params" :item-params="itemParams" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </Scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from '../../components/content/backtop/BackTop'

import {getDetail, Goods, getRecommend} from 'network/detail'

import {debounce} from 'common/utlis'
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
    DetailBottomBar,
    BackTop,

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
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      baseInfoSetTop: 0
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
    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopY = []

      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE)
      
      // console.log(this.themeTopY);
    },300)
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
          this.itemParams = data.itemParams;
          //评论信息
          if(data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0];
          }

          //没有缓存时值不对
          //获取商品，参数，评论，推荐offsetTop值
          // this.$nextTick(() => {
          //   this.themeTopY = []

          //   this.themeTopY.push(0);
          //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
            
          //   console.log(this.themeTopY);
          // })

        })
     },
    // 推荐
    recommend() {
      getRecommend()
        .then(res => {
          // console.log(res);
          const date = res.data
          this.recommends = date.list
        })
    },

     //监听详情图片加载完刷新scroll
    detailImageload() {
       //混入中的refresh
      this.refresh()

      this.getThemeTopY()
      //获取baseInfo高度
      this.baseInfoSetTop = this.$refs.baseInfo.$el.offsetTop
    },
     
     //监听navBarTitle点击
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
    },

    //监听内容滚动并改变标题
    contentScroll(position) {
      // console.log(-position.y);
      //1.获取Y值
      let positionY = -position.y
      /**
       * 1.普通做法
       */
      //2.positionY和标题的高度（getThemeTopY）进行对比
      // let length  = this.themeTopY.length
      // for(let i = 0; i < length; i++) {
      //   if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) || (i===length-1 && positionY > this.themeTopY[i])) {
      //     this.currentIndex = i
      //     // console.log(this.currentIndex);
      //     this.$refs.navBar.currentIndex = this.currentIndex
      //   }
      // }

      /* 
      2.push一个最大值
      */
      let length  = this.themeTopY.length
      for(let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }
      // 是否显示
      this.isShowBackTop = (-position.y) > this.baseInfoSetTop
    },

    backClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },

    // 加入购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.GoodsInfo.title;
      product.desc = this.GoodsInfo.desc;
      product.price = this.GoodsInfo.lowNowPrice;
      product.iid = this.iid
      //2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
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