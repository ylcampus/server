/*
* 打折券管理管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const DiscountService = require('../service/discountService')
const Result = require('../../root/libs/result')

// 添加打折券
router.post('/addDiscount', (req, res, next) => {
  co(function *() {
    let result = yield DiscountService.addDiscount(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
// 打折券详情
router.get('/discountDetail/:discountId', (req, res, next) => {
  co(function *() {
    let result = yield DiscountService.discountDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 打折券列表
router.get('/discountList', (req, res, next) => {
  co(function *() {
    let result = yield DiscountService.discountList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
