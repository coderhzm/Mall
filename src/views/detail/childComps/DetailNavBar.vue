<template>
  <div>
    <nav-bar>
      <div slot="left" class="detback" @click="DetBackClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div 
        v-for="(item,index) in navBarTitle"
        :key="index"
        :class="{active: currentIndex === index}"
        class="title-item"
        @click="itemClick(index)"
        >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  props: {
    navBarTitle: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    NavBar
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("titleClick", index)
    },
    DetBackClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.active {
  color: var(--color-tint);
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 15px;
}
.detback img {
  margin-top: 12px;
}
</style>