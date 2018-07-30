/*
* 店铺管理
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const ShopService = require('../service/shopService')
const Result = require('../../root/libs/result')

// 添加店铺
router.post('/addShop', (req, res, next) => {
  co(function *() {
    let result = yield ShopService.addShop(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 删除店铺
router.post('/deleteShop/:shopId', (req, res, next) => {
  co(function *() {
    let result = yield ShopService.deleteShop(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑店铺
router.put('/editShop', (req, res, next) => {
  co(function *() {
    let result = yield ShopService.editShop(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取店铺详情
router.get('/shopDetail/:shopId', (req, res, next) => {
  co(function *() {
    let result = yield ShopService.shopDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取店铺列表
router.get('/shopList', (req, res, next) => {
  co(function *() {
    let result = yield ShopService.shopList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
