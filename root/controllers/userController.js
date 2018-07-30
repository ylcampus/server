/*
* 用户管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const UserService = require('../service/userService')
const Result = require('../../root/libs/result')

// 添加用户
router.post('/addUser', (req, res, next) => {
  co(function *() {
    let result = yield UserService.addUser(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 删除用户
router.post('/deleteUser', (req, res, next) => {
  co(function *() {
    let result = yield UserService.deleteUser(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑用户
router.put('/editUser', (req, res, next) => {
  co(function *() {
    let result = yield UserService.editUser(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 重置用户密码
router.post('/resetUserPassword/:userId', (req, res, next) => {
  co(function *() {
    let result = yield UserService.resetUserPassword(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取用户详情
router.get('/userDetail/:userId', (req, res, next) => {
  co(function *() {
    let result = yield UserService.userDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取用户列表
router.get('/userList', (req, res, next) => {
  co(function *() {
    let result = yield UserService.userList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
