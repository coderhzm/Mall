import { debounce } from './utlis'

export const itemListenerMixin = {
  data() {
    return {
      itemImglisener: null,
      refresh: null
    }
  },
  mounted() {
    //监听图片加载完刷新
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImglisener = () => {
      this.refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImglisener)
  },
}