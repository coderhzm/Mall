import {
  ADD_TO_CART, 
  ADD_COUNTER 
} from './mutations-type'

export default {
  // 添加商品
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  //商品数量加一
  [ADD_COUNTER](state, payload) {
    payload.count ++
  }
}