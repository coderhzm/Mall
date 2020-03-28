<template>
  <div>
    <tab-bar>
      <tab-bar-item link="/home" :activeColor = "this.activeColor">
        <img slot="icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="active-icon" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/category" :activeColor = "this.activeColor">
        <img slot="icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="active-icon" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/cart" :activeColor = "this.activeColor">
        <img slot="icon" src="~assets/img/tabbar/cart.svg" alt="">
        <img slot="active-icon" src="~assets/img/tabbar/cart_active.svg" alt="">
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/profile" :activeColor = "this.activeColor">
        <img slot="icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="active-icon" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return{
      activeColor: '#ff5777'
    }
  }
}
</script>

<style scoped>
</style>