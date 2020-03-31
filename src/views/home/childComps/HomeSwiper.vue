<template>
  <div>
    <Swiper>
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
  }
}
</script>

<style scoped>

</style>