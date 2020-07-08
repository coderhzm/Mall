<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bottom-bar-rigth">
      <div class="add-cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {

    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart")
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  height: 49px;
  line-height: 49px;

  display: flex;
  text-align: center;
  background-color: #fff;
}


.bottom-bar-left {
  flex: 1;

  display: flex;
  justify-content: center;
}
.bottom-bar-left div {
  flex: 1;
}
.bottom-bar-left .text {
  display: block;
  font-size: 13px;
  line-height: 20px;
}
.icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 3px auto 2px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.service {
  background-position: 0 -54px;
}
.shop {
  background-position: 0 -98px;
}

.bottom-bar-rigth {
  flex: 1;

  display: flex;
  font-size: 15px;
}
.bottom-bar-rigth .add-cart {
  flex: 1;

  background-color: #ffe817;
}
.bottom-bar-rigth .buy {
  flex: 1;

  background-color: #f69;
  color: #fff;
}
</style>