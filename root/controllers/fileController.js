/*
* 文件管理
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const path = require('path')
const fs = require('fs')
const FileService = require('../service/fileService')
const Result = require('../../root/libs/result')

// 读取文件目录
router.post('/readDir', (req, res, next) => {
  co(function *() {
    // 对于租户-从这个地方做一下处理就好了 - 之后做到的时候再处理
    let result = yield FileService.readDir(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 删除目录
router.post('/rmDir', (req, res, next) => {
  co(function *() {
    let result = yield FileService.rmDir(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 文件下载
router.get('/download', (req, res, next) => {
  co(function *() {
    let downPath = yield FileService.download(req)
    res.download(downPath)
  }).catch((err) => {
    next(err)
  })
})

/**
 * @name 文件预览
 * @param rpath 文件路径
 * @returns none
 */
router.get('/preview', (req, res, next) => {
  co(function *() {
    let result = yield FileService.preview(req)
    res.set({
      'Content-Type': result.cType,
      'Content-Disposition': result.cDs
    })
    fs.createReadStream(result.filePath).pipe(res)
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
