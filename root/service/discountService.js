/*
* 打折券管理管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const co = require('co')
const DiscountDao = require('../dao/discountDao')

// 添加打折券
exports.addDiscount = (req) => {
  return co(function *() {
    return yield DiscountDao.addDiscount(req)
  })
}

// 打折券详情
exports.discountDetail = (req) => {
  return co(function *() {
    return yield DiscountDao.discountDetail(req.params.discountId)
  })
}

// 打折券列表
exports.discountList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'discount.err400004'
      throw err
    }
    // 下面有一段判断角色
    let result = yield DiscountDao.discountList(query)
    let total = yield DiscountDao.discountTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}
