<template>
  <div>
    <Scroll class="content" ref="scroll">
    <cart-item 
      v-for="(item,index) in cartList" 
      :key="index"
      :item-info="item" />
    </Scroll>
  </div>
</template>

<script>
import CartItem from './CartlistItem'
import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from "vuex"

export default {
  name: "CartList",
  components: {
    Scroll,
    CartItem
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  top: 44px;
  bottom: 48px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>