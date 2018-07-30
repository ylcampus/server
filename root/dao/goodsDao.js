/*
* 商品管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const goodsModel = require('../libs/mongo').model('goods')
const shopModel = require('../libs/mongo').model('shop')
const settings = require('../../bin/setting')
// 添加商品
exports.addGoods = (req) => {
  let saveDoc = {
    goodsId: req.body.goodsId, // 商品Id
    shopId: req.body.shopId, // 店铺Id
    title: req.body.title, // 商品名称
    price: req.body.price, // 价格
    status: 2, // 状态 1：出售中 2：库存中
    updateStatus: 1, // 更新状态 1：新增 2：更新成功；3：更新失败
    timeStamp: (new Date()).getTime(), // 时间戳
    pics: req.body.pics || {}, // 颜色图片
    descPics: req.body.descPics || [], // 描述图片
    skuList: req.body.skuList || [] // 颜色 尺码 skuid与库存信息
  }
  return goodsModel.create(saveDoc)
}

// 商品上下架
exports.goodsUpOrDown = (req) => {
  let doc = {}
  if (req.body.roleId) { // 角色Id
    doc.roleId = req.body.roleId
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return goodsModel.updateOne({userId: req.body.userId}, doc)
}

// 获取商品详情
exports.getGoodsDetail = (goodsId) => {
  return goodsModel.findOne({goodsId: goodsId})
}

// 获取商品列表
exports.goodsList = (query) => {
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  return goodsModel.find(condition).skip(skip).limit(pageSize).then((res) => {
    return res.map((row) => {
      let backMap = {
        goodsId: row.goodsId,
        shopId: row.shopId,
        price: row.price,
        title: row.title,
        status: row.status,
        updateStatus: row.updateStatus,
        timeStamp: row.timeStamp,
        create_at: row.create_at,
        update_at: row.update_at,
        pics: Object.values(row.pics)
      }
      return backMap
    })
  })
}

// 获取店铺详情
exports.getShopDetail = (shopId) => {
  return shopModel.findOne({shopId: shopId})
}
// 获取商品总数
exports.goodsTotal = (query) => {
  let condition = {
    tenantId: query.tenantId
  }
  return goodsModel.count(condition)
}
