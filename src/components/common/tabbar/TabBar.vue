<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
#tab-bar{
  display: flex;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  height: 49px;
  text-align: center;
  
  background-color: #f6f6f6;
  border-top: 1px solid #eeee;
  box-shadow: 0 -1px 1px rgba(150,150,150,.08);
}
</style>