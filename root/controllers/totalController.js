/*
* 数据统计
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const TotalService = require('../service/totalService')
const Result = require('../../root/libs/result')

// 获取访问数据
router.post('/getLineChartData', (req, res, next) => {
  co(function *() {
    let result = []
    let type = parseInt(req.body.type, 10)
    if (type === 1) {
      result = yield TotalService.getLineChartDataFromVisitQuarterModel(req)
    } else if ([2, 3, 4, 5].indexOf(type) !== -1) {
      result = yield TotalService.getLineChartDataFromVisitDayModel(req)
    }
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取订单统计数据
router.post('/getOrderChartData', (req, res, next) => {
  co(function *() {
    let result = yield TotalService.getOrderChartData(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取商品统计数据
router.post('/getGoodsChartData', (req, res, next) => {
  co(function *() {
    let result = yield TotalService.getGoodsChartData(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取会员访问数据
router.post('/getMemberChartData', (req, res, next) => {
  co(function *() {
    let result = yield TotalService.getMemberChartData(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取打折券访问数据
router.post('/getDiscountChartData', (req, res, next) => {
  co(function *() {
    let result = yield TotalService.getDiscountChartData(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
