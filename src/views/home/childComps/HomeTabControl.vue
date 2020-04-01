<template>
  <div class="tab-control">
    <tab-control :titles="titles" />
  </div>
</template>

<script>
import TabControl from 'components/content/tabControl/TabControl'
export default {
  name: 'HomeTabControl',
  components: {
    TabControl
  },
  data() {
    return {
      titles: ['流行','新款','精选']
    }
  },
}
</script>

<style scoped>
.tab-control {
  position: sticky;
  top: 44px;
}
</style>