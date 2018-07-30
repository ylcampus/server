/*
* 区域管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const AreaService = require('../service/areaService')
const Result = require('../../root/libs/result')

// 获取区域树
router.post('/areaTree', (req, res, next) => {
  co(function *() {
    let result = yield AreaService.areaTree(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
