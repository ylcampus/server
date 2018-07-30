/*
* 角色管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const RoleService = require('../service/roleService')
const Result = require('../../root/libs/result')

// 添加角色
router.post('/addRole', (req, res, next) => {
  co(function *() {
    let result = yield RoleService.addRole(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 删除角色
router.post('/deleteRole', (req, res, next) => {
  co(function *() {
    let result = yield RoleService.deleteRole(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑角色
router.put('/editRole', (req, res, next) => {
  co(function *() {
    let result = yield RoleService.editRole(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取角色详情
router.get('/roleDetail/:roleId', (req, res, next) => {
  co(function *() {
    let result = yield RoleService.roleDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取角色列表
router.get('/roleList', (req, res, next) => {
  co(function *() {
    let result = yield RoleService.roleList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
