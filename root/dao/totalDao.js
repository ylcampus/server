/*
* 数据统计-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const VisitQuarterModel = require('../libs/mongo').model('visit_quarter')
const VisitDayModel = require('../libs/mongo').model('visit_day')
const orderModel = require('../libs/mongo').model('order')
const memberModel = require('../libs/mongo').model('member')
const discountModel = require('../libs/mongo').model('discount')
const goodsModel = require('../libs/mongo').model('goods')
// 检查数据是否存在
exports.isDataExist = (map) => {
  return VisitQuarterModel.findOne(map).then((doc) => {
    return doc
  })
}
// 更新访问数据
exports.addVisitData = (map) => {
  let saveDoc = {
    tenantId: map.tenantId,
    time: map.time,
    total: 1
  }
  return VisitQuarterModel.create(saveDoc)
}

// 更新访问数据
exports.updateVisitData = (map) => {
  let condition = {
    tenantId: map.tenantId,
    time: map.time
  }
  return VisitQuarterModel.updateOne(condition, {total: map.total})
}

// 从刻统计表获取访问数据 tenantId
exports.getLineChartDataFromVisitQuarterModel = (req) => {
  // 关于租户与系统管理员的区分之后再做统一处理
  let condition = {}
  if (req.body.shopId) {
    condition.tenantId = req.body.shopId
  }
  return VisitQuarterModel.find(condition)
}

// 从刻统计表获取访问数据
exports.getLineChartDataFromVisitDayModel = (req) => {
  let condition = {}
  if (req.body.shopId) {
    condition.tenantId = req.body.shopId
  }
  if (req.body.startTime) {
    condition['$and'] = [
      {
        time: {
          '$gte': req.body.startTime
        }
      }
    ]
  }
  if (req.body.startTime && req.body.endTime) {
    condition['$and'] = [
      {
        'time': {
          '$gte': req.body.startTime
        }
      },
      {
        'time': {
          '$lt': req.body.endTime
        }
      }
    ]
  }
  return VisitDayModel.find(condition)
}

// 获取订单统计数据
exports.getOrderChartData = (req) => {
  let condition = []
  if (req.body.shopId !== '10000') {
    condition.push({
      $match: {
        shopId: req.body.shopId
      }
    })
  }
  condition.push({
    $group: {
      _id: {
        status: '$status'
      },
      value: {$sum: 1}
    }
  })
  return orderModel.aggregate(condition)
}

// 获取商品统计数据
exports.getGoodsChartData = (req) => {
  let condition = []
  if (req.body.shopId !== '10000') {
    condition.push({
      $match: {
        shopId: req.body.shopId
      }
    })
  }
  condition.push({
    $group: {
      _id: {
        status: '$status'
      },
      value: {$sum: 1}
    }
  })
  return goodsModel.aggregate(condition)
}

// 获取会员统计数据
exports.getMemberChartData = (req) => {
  let condition = [
    {
      $group: {
        _id: {
          status: '$status'
        },
        value: {$sum: 1}
      }
    }
  ]
  return memberModel.aggregate(condition)
}

// 获取打折券统计数据
exports.getDiscountChartData = (req) => {
  let condition = []
  if (req.body.shopId !== '10000') {
    condition.push({
      $match: {
        shopId: req.body.shopId
      }
    })
  }
  condition.push({
    $group: {
      _id: {
        status: '$status'
      },
      value: {$sum: 1}
    }
  })
  return discountModel.aggregate(condition)
}
