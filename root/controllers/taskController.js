/*
* 定时任务
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const TaskService = require('../service/taskService')
const Result = require('../../root/libs/result')

// 添加定时任务
router.post('/addTask', (req, res, next) => {
  co(function *() {
    let result = yield TaskService.addTask(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑定时任务
router.put('/editTask', (req, res, next) => {
  co(function *() {
    let result = yield TaskService.editTask(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取定时任务详情
router.get('/taskDetail/:taskId', (req, res, next) => {
  co(function *() {
    let result = yield TaskService.taskDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取定时任务列表
router.get('/taskList', (req, res, next) => {
  co(function *() {
    let result = yield TaskService.taskList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
