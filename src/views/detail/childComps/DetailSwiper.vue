<template>
    <div>
      <Swiper class="detail-swiper" v-if="isSwiper">
        <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </Swiper>
    </div>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper'

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    computed: {
      isSwiper() {
        return this.topImages.length
      }
    }
  }
</script>

<style scoped>
.detail-swiper {
  overflow: hidden;
  height: 300px;
}
</style>
