<template>
  <div>
    <Swiper v-if="showSwiper">
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
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
  computed: {
    showSwiper() {
      return this.banner.length
    }
  }
}
</script>

<style scoped>

</style>