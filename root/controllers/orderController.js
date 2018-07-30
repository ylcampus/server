/*
* 订单管理
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const OrderService = require('../service/orderService')
const Result = require('../../root/libs/result')
// 提交订单
router.post('/submitOrder', (req, res, next) => {
  co(function *() {
    let result = yield OrderService.submitOrder(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
// 获取订单详情
router.get('/orderDetail/:orderId', (req, res, next) => {
  co(function *() {
    let result = yield OrderService.orderDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
// 获取订单列表
router.get('/orderList', (req, res, next) => {
  co(function *() {
    let result = yield OrderService.orderList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
