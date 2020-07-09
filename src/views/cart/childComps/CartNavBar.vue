<template>
  <div>
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import  NavBar from 'components/common/navbar/NavBar'

import { mapGetters } from "vuex"

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.cart-nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;

  background-color: var(--color-high-text);
  color: var(--color-background);
  font-weight: 700;
}
</style>