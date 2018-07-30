/*
* 打折券管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const uuid = require('uuid')
const discountModel = require('../libs/mongo').model('discount')
// 添加打折券
exports.addDiscount = (req) => { // discountId shopId shopName userId goodsId type  status
  let saveDoc = {
    discountId: uuid.v4(), // 用户Id
    shopId: '62193774', // 用户id
    shopName: '美津浓官方体验店', // 普通用户
    // memberId: '3a45b343-91ca-4d6a-9d60-82441b39829c', // 账号
    // memberAcount: 'dongjiguo@2013',
    // goodsId: '10000', // 角色Id
    // goodsName: '测试商品',
    type: 5, // 是初始密码
    status: 1 // 是否同意优乐用户协议
  }
  return discountModel.create(saveDoc)
}

// 打折券详情
exports.discountDetail = (discountId) => {
  return discountModel.findOne({discountId: discountId})
}

// 获取打折券列表
exports.discountList = (query) => {
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  return discountModel.find(condition).skip(skip).limit(pageSize)
}

// 获取打折券总数
exports.discountTotal = (query) => {
  let condition = {}
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  return discountModel.count(condition)
}
