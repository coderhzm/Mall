<template>
  <div class="store-info" v-if="Object.keys(storeInfo).length !==  0">
    <div class="store-info-top">
      <img :src="storeInfo.shopLogo">
      <span class="title">{{storeInfo.name}}</span>
    </div>
    <div class="store-info-middle">
      <div class="info-middle-item info-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{storeInfo.cSells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{storeInfo.cGoods}}
          </div>
          <div class="goods-text">
            全部宝贝
          </div>
        </div>
      </div>
      <div class="info-middle-item info-middle-right">
        <table>
          <tr v-for="(item, index) in storeInfo.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="store-buttom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailStoreInfo",
  props: {
    storeInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter: function (value) {
       console.log(value);
      if (value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
.store-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.store-info-top {
  line-height: 45px;
  display: flex;
  align-content: center;
}
.store-info-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.1);
}
.store-info-top .title {
  margin-left: 10px;
  vertical-align: center;
}
.store-info-middle {
  margin-top: 15px;
  display: flex;
  align-content: center;
}
.info-middle-item {
  flex: 1;
}
.info-middle-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0,0,0,.1);
}
.info-sells, .info-goods {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sells-count, .goods-count {
  font-size: 24px;
}
.sells-text, .goods-text {
  margin-top: 10px;
  font-size: 18px;
}
.info-middle-right {
  font-size: 13px;
  color: #333;
}
.info-middle-right table {
  width: 120px;
  margin-left: 30px;
}
.info-middle-right table td {
  padding: 5px 0;
}
.info-middle-right .score {
  color: #5ea732;
}

.info-middle-right .score-better {
  color: #f13e3a;
}

.info-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.info-middle-right .better-more span {
  background-color: #f13e3a;
}
.store-buttom {
  margin-top: 13px;
  text-align: center;
}
.enter-shop {
  display: inline-block;
  width: 150px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: #f2f5f8;
  border-radius: 10px;
}
</style>