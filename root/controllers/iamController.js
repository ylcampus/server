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
const IamService = require('../service/iamService')
const Result = require('../../root/libs/result')

// 登录
router.post('/userLogin', (req, res, next) => {
  co(function *() {
    let result = yield IamService.userLogin(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取会话信息
router.post('/getSession', (req, res, next) => {
  co(function *() {
    let result = yield IamService.getSession(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 登出
router.post('/loginOut', (req, res, next) => {
  co(function *() {
    let result = yield IamService.loginOut(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取验证码
router.post('/getCaptcha', (req, res, next) => {
  co(function *() {
    let result = yield IamService.getCaptcha(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 检测账号信息
router.post('/checkAccountMsg', (req, res, next) => {
  co(function *() {
    let result = yield IamService.checkAccountMsg(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取手机验证码
router.post('/getTelephoneCode', (req, res, next) => {
  co(function *() {
    let result = yield IamService.getTelephoneCode(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 修改用户密码
router.post('/backPwd', (req, res, next) => {
  co(function *() {
    let result = yield IamService.backPwd(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 修改密码并绑定手机号
router.post('/modifyPwdAndBindTelephone', (req, res, next) => {
  co(function *() {
    let result = yield IamService.modifyPwdAndBindTelephone(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 更换手机号
router.post('/changeTelephone', (req, res, next) => {
  co(function *() {
    let result = yield IamService.changeTelephone(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 修改密码
router.post('/modifyPwd', (req, res, next) => {
  co(function *() {
    let result = yield IamService.modifyPwd(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取个人基本信息
router.post('/getBasicMsg', (req, res, next) => {
  co(function *() {
    let result = yield IamService.getBasicMsg(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 编辑个人基本信息
router.put('/editBasicMsg', (req, res, next) => {
  co(function *() {
    let result = yield IamService.editBasicMsg(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 注册
router.post('/register', (req, res, next) => {
  co(function *() {
    let result = yield IamService.register(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})
module.exports = router
