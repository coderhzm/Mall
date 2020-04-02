<template>
  <div class="home-navbar">
    <nav-bar class="home-nav">
      <div slot="center" >购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'HomeNavBar',
  components: {
    NavBar
  },
}
</script>

<style scoped>
.home-navbar{
  padding-bottom: 44px;
}
.home-nav{
  background-color: var(--color-high-text);
  color: var(--color-background);
  font-weight: 700;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>