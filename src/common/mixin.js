import { debounce } from './utlis'

export const itemListenerMixin = {
  data() {
    return {
      itemImglisener: null
    }
  },
  mounted() {
    //监听图片加载完刷新
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImglisener = () => {
      refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImglisener)
  },
}