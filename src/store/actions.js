import {
  ADD_TO_CART, 
  ADD_COUNTER 
} from './mutations-type'

export default {
  //添加商品
  addCart(context, payload) {
    //1.查找之前数组中是否已有改商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
    if(oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    }else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }

}