/*
* 商品管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
// // addGoods deleteGoods goodsUpOrDown goodsDetail goodsList
'use strict'
const co = require('co')
const GoodsDao = require('../dao/goodsDao')

// 添加商品
exports.addGoods = (req) => {
  return co(function *() {
    // 明天详细分析
    return yield GoodsDao.addGoods(req)
  })
}

// 商品上下架
exports.goodsUpOrDown = (req) => {
  return co(function *() {
    return {}
  })
}

// 更新商品数据
exports.updateGoods = (req) => {
  return co(function *() {
    return {
      flag: 'success'
    }
  })
}

// 获取商品详情
exports.goodsDetail = (req) => {
  return co(function *() {
    let goodsId = req.params.goodsId
    let result = yield GoodsDao.getGoodsDetail(goodsId)
    if (result) {
      let shopResult = yield GoodsDao.getShopDetail(result.shopId)
      if (shopResult) {
        result._doc.shopName = shopResult.name
      }
    }
    return result
  })
}

// 获取商品列表
exports.goodsList = (req) => {
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
    let result = yield GoodsDao.goodsList(query)
    // 获取店铺名称
    for (let i = 0; i < result.length; i++) {
      let shopResult = yield GoodsDao.getShopDetail(result[i].shopId)
      if (shopResult) {
        result[i].shopName = shopResult.name
      }
    }
    let total = yield GoodsDao.goodsTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}
