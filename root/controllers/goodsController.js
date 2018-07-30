/*
* 商品管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const GoodsService = require('../service/goodsService')
const Result = require('../../root/libs/result')

// 添加商品
router.post('/addGoods', (req, res, next) => {
  co(function *() {
    let result = yield GoodsService.addGoods(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 商品上下架 updateGoods
router.post('/goodsUpOrDown', (req, res, next) => {
  co(function *() {
    let result = yield GoodsService.goodsUpOrDown(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 更新商品数据
router.post('/updateGoods/:goodsId', (req, res, next) => {
  co(function *() {
    let result = yield GoodsService.updateGoods(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取商品详情
router.get('/goodsDetail/:goodsId/:shopId', (req, res, next) => {
  co(function *() {
    let result = yield GoodsService.goodsDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取商品列表
router.get('/goodsList', (req, res, next) => {
  co(function *() {
    let result = yield GoodsService.goodsList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
