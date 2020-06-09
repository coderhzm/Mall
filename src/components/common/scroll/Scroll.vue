<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      //监听屏幕滚动的
      probeType: this.probeType,
      //监听上拉
      pullUpLoad: this.pullUpLoad
    })
    //监听屏幕滚动的
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('sendScroll', position)
      })
    }
    
    //监听上拉
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('sendpullup')
      })
    }
  },
  methods: {
    scrollTo(x, y, time) {
      // if(this.scroll && this.scroll.scrollTo) {
      //   this.scroll.scrollTo(x, y , time)
      // }
      this.scroll && this.scroll.scrollTo(x, y , time)
    },
    finishPullUp() {
      // if(this.scroll && this.scroll.finishPullUp) {
      //   this.scroll.finishPullUp()
      // }
      this.scroll.finishPullUp()
    },
    refresh() {
      // if(this.scroll && this.scroll.refresh) {
      //   this.scroll.refresh()
      // }
      this.scroll && this.scroll.refresh()
    },
    getCurrentY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>