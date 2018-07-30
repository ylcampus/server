/*
* 数据统计
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const TotalkDao = require('../dao/totalDao')
const VisitQuarterModel = require('../libs/mongo').model('visit_quarter')
const VisitDayModel = require('../libs/mongo').model('visit_day')
const util = require('../libs/util')

// 添加访问数据
exports.addVisitData = (tenantId) => {
  co(function *() {
    let time = util.getQuarater()
    let map = {
      tenantId: tenantId,
      time: time
    }
    let res = yield TotalkDao.isDataExist(map)
    if (res) {
      map.total = parseInt(res.total, 10) + 1
      yield TotalkDao.updateVisitData(map)
    } else {
      yield TotalkDao.addVisitData(map)
    }
  }).catch((err) => { // 捕获错误不让程序中断
    console.log(err)
  })
}

// 获取所有刻访问数据
/*
* 大致步骤如下：
* 获取当天所有访问数据
* 数据分组处理
* 添加访问数据到按日统计表
* 清空按刻统计表
* */
exports.getAllVisitData = (tenantId) => {
  return co(function *() {
    return VisitQuarterModel.find()
  })
}

// 检查日访问数据是否存在
exports.isVisitDayDataExist = (condition) => {
  return VisitDayModel.findOne(condition).then((doc) => {
    return !!doc
  })
}

// 添加日访问数据
exports.addVisitDayData = (doc) => {
  return co(function *() {
    return VisitDayModel.create(doc)
  })
}

// 从刻统计表获取访问数据
exports.getLineChartDataFromVisitQuarterModel = (req) => {
  return co(function *() {
    if (!req.body.shopId) {
      let err = new Error('参数错误')
      err.code = 'total.err400001'
      throw err
    }
    let result = yield TotalkDao.getLineChartDataFromVisitQuarterModel(req)
    let backMap = {}
    result.forEach(row => {
      backMap[row.time] = row.total
    })
    return backMap
  })
}

// 从日统计表获取访问数据
exports.getLineChartDataFromVisitDayModel = (req) => {
  return co(function *() {
    if (!req.body.shopId) {
      let err = new Error('参数错误')
      err.code = 'total.err400001'
      throw err
    }
    let result = yield TotalkDao.getLineChartDataFromVisitDayModel(req)
    let backMap = {}
    result.forEach(row => {
      backMap[row.time] = row.total
    })
    return backMap
  })
}

// 获取订单统计数据
exports.getOrderChartData = (req) => {
  return co(function *() {
    if (!req.body.shopId) {
      let err = new Error('参数错误')
      err.code = 'total.err400001'
      throw err
    }
    return yield TotalkDao.getOrderChartData(req)
  })
}

// 获取商品统计数据
exports.getGoodsChartData = (req) => {
  return co(function *() {
    if (!req.body.shopId) {
      let err = new Error('参数错误')
      err.code = 'total.err400001'
      throw err
    }
    return yield TotalkDao.getGoodsChartData(req)
  })
}

// 获取会员统计数据
exports.getMemberChartData = (req) => {
  return co(function *() {
    return yield TotalkDao.getMemberChartData(req)
  })
}

// 获取打折券统计数据
exports.getDiscountChartData = (req) => {
  return co(function *() {
    if (!req.body.shopId) {
      let err = new Error('参数错误')
      err.code = 'total.err400001'
      throw err
    }
    return yield TotalkDao.getDiscountChartData(req)
  })
}
