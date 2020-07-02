import {request} from './request.js'

//详情
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

//推荐
export function getRecommend() {
  return request({
    url: '/recommend',
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
    this.discountBgColor = itemInfo.discountBgColor
  }
}