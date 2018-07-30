/*
* 订单管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const uuid = require('uuid')
const co = require('co')
const OrderDao = require('../dao/orderDao')
const addressMap = require('../libs/dictionary/address/address.json')

// 提交订单 - 一切从简
exports.submitOrder = (req) => {
  return co(function *() {
    // 第一步参数检测
    let discountId = req.body.discountId // 打折券Id
    let goodsId = req.body.goodsId // 商品Id
    let color = req.body.color // 颜色
    let size = req.body.size // 尺码
    if (!discountId || !goodsId || !color || !size) {
      let err = new Error('参数错误')
      err.code = 'task.err400005'
      throw err
    }
    let submitMap = {
      orderId: uuid.v4(),
      payWay: 2,
      isPay: false,
      status: 1
    }
    submitMap.discountId = discountId
    submitMap.goodsId = goodsId
    submitMap.color = color
    submitMap.size = size
    // 获取会员数据
    let memberMsg = yield OrderDao.getMemberMsg(req)
    submitMap.memberId = memberMsg.memberId
    // 检查收货是否存在
    if (!memberMsg.province || !memberMsg.city || !memberMsg.school || !memberMsg.campus || !memberMsg.name || !memberMsg.telephone) {
      let ntErr = new Error('请添加收货地址信息')
      ntErr.code = 'task.err400003'
      throw ntErr
    }
    // 封装收货地址数据
    submitMap.address = addressMap[memberMsg.campus]
    submitMap.consignee = memberMsg.name
    submitMap.telephone = memberMsg.telephone
    if (req.body.invoice) {
      submitMap.invoice = req.body.invoice
    }
    // 获取打折券数据
    let discountMsg = yield OrderDao.getDiscountMsg(discountId)
    let disType = parseInt(discountMsg.type, 10)
    // 获取商品数据（用于计算订单金额）
    let goodsMsg = yield OrderDao.getGoodsMsg(goodsId)
    submitMap.goodsName = goodsMsg.title
    submitMap.shopId = goodsMsg.shopId
    // 获取店铺数据
    let shopMsg = yield OrderDao.getShopMsg(goodsMsg.shopId)
    submitMap.shopName = shopMsg.name || ''
    // 计算订单总金额
    const tagPrice = parseInt(goodsMsg.tagPrice, 10)
    let amount = parseInt(((disType * tagPrice) / 10), 10)
    submitMap.amount = amount
    // 还需要修改打折券的状态-- 这个以后再说把
    // 提交订单
    return yield OrderDao.submitOrder(submitMap)
  })
}

// 订单详情
exports.orderDetail = (req) => {
  return co(function *() {
    let orderId = req.params.orderId
    let orderResult = yield OrderDao.getOrderDetail(orderId)
    if (orderResult) {
      let extendMap = {}
      // 获取商品数据 -- 最终是需要进行优化的
      let goodsId = orderResult.goodsId
      let goodsMsg = yield OrderDao.getGoodsMsg(goodsId)
      extendMap.pic = goodsMsg.pic
      // 获取商品数据
      return {
        ...orderResult._doc,
        ...extendMap
      }
    } else {
      return null
    }
  })
}

// 订单列表
exports.orderList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    let result = yield OrderDao.orderList(query)
    let total = yield OrderDao.orderTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}
