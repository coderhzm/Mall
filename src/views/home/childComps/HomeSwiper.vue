<template>
  <div class="home-swiper">
    <Swiper v-if="showSwiper">
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </Swiper>
  </div>
</template>

<script>

import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banner: Array
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperimageload')
        this.isLoad = true
      }
    }
  },
  computed: {
    showSwiper() {
      return this.banner.length
    }
  }
}
</script>

<style scoped>
.home-swiper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 52%;
  background-color: #eee;
}
</style>