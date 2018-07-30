/*
* 用户管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const orderModel = require('../libs/mongo').model('order')
const memberModel = require('../libs/mongo').model('member')
const discountModel = require('../libs/mongo').model('discount')
const shopModel = require('../libs/mongo').model('shop')
// 获取会员详情
exports.getMemberMsg = (req) => {
  return memberModel.findOne({memberId: '6e3f642f-0cda-493f-866a-8279c2d41884'})
}
// 获取打折券详情
exports.getDiscountMsg = (discountId) => {
  return discountModel.findOne({discountId: discountId})
}
// 获取商品数据
exports.getGoodsMsg = (goodsId) => {
  return new Promise((resolve) => {
    resolve({
      tagPrice: 1280,
      title: '美津浓缓冲慢跑鞋',
      shopId: '62193774',
      pic: '//img12.360buyimg.com/n1/jfs/t21385/358/1415232486/134848/8b1d6a5a/5b28daa8N9646d1dd.jpg'
    })
  })
}
// 获取店铺详情
exports.getShopMsg = (shopId) => {
  return shopModel.findOne({shopId: shopId})
}
// 提交订单
exports.submitOrder = (saveDoc) => {
  return orderModel.create(saveDoc)
}
// 获取订单详情
exports.getOrderDetail = (orderId) => {
  return orderModel.findOne({orderId: orderId})
}
// 获取订单列表
exports.orderList = (query) => {
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  return orderModel.find(condition).skip(skip).limit(pageSize)
}
// 获取订单总数
exports.orderTotal = (query) => {
  let condition = {}
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  return orderModel.count(condition)
}
