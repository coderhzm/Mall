<template>
  <div class="goods">
    <goods-list-item
    v-for="(item,index) in goods"
    :key="index"
    :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'goodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: Array
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>