// 爬虫模块-持久层 2018/07
'use strict'
const goodsModel = require('../libs/mongo').model('goods')

// 添加商品
exports.addGoods = (map) => {
  let saveDoc = {
    goodsId: map.goodsId,
    shopId: map.shopId,
    title: map.title,
    price: map.price,
    status: 2, // 状态 1：出售中 2：库存中
    updateStatus: 1, // 更新状态 1：新增 2：更新
    timeStamp: (new Date()).getTime(), // 时间戳
    pics: map.pics || {}, // 颜色图片
    descPics: map.descPics || [], // 描述图片
    skuList: map.skuList || [] // 颜色 尺码 skuid与库存信息
  }
  return goodsModel.create(saveDoc)
}

// 更新商品
exports.updateGoodsDocFromDB = (map) => {
  let updateDoc = {
    shopId: map.shopId,
    title: map.title,
    price: map.price,
    updateStatus: 2,
    timeStamp: (new Date()).getTime(),
    pics: map.pics || {},
    descPics: map.descPics || [],
    skuList: map.skuList || []
  }
  return goodsModel.updateOne({goodsId: map.goodsId}, updateDoc)
}

// 获取商品详情
exports.getGoodsDetailMsg = (goodsId) => {
  return goodsModel.findOne({goodsId: goodsId}, 'goodsId timeStamp title pics')
}
