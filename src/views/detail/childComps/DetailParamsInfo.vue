<template>
  <div class="param-size" v-if="Object.keys(itemParams).length !== 0">
    <!-- 尺码 -->
    <div v-for="(tables, index) in itemParams.rule.tables"
        :key="index">
      <table>
        <tr v-for="(tr, index) in tables" :key="index">
          <td v-for="(td, index) in tr" :key="index">{{td}}</td>
        </tr>
      </table>
    </div>
    <!-- 参数 -->
    <table class="info-param">
      <tr v-for="(item, index) in itemParams.info.set" :key="index">
        <td class="info-param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>

    <div class="info-img" v-if="itemParams.info.image">
      <img :src="itemParams.info.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },

}
</script>

<style scoped>
.param-size {
  padding: 20px 15px;
  font-size: 15px;
  border-bottom: 5px solid #f2f5f8;
}

.param-size table{
  width: 100%;
  border-collapse: collapse;
}

.param-size tr {
  height: 35px;
}

.param-size tr td {
  border-top: 1px solid rgba(100,100,100,.1);
}

.info-param {
  border-top: 1px solid rgba(0,0,0,.1);
}

.info-param-key {
  width: 95px;
}

.param-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
</style>