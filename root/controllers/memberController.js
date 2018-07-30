/*
* 会员管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const express = require('express')
const router = express.Router()
const co = require('co')
const MemberService = require('../service/memberService')
const Result = require('../../root/libs/result')

// 删除会员
router.post('/deleteMember/:memberId', (req, res, next) => {
  co(function *() {
    let result = yield MemberService.deleteMember(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 冻结、解冻会员账号
router.post('/freeze', (req, res, next) => {
  co(function *() {
    let result = yield MemberService.freeze(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取会员详情
router.get('/memberDetail/:memberId', (req, res, next) => {
  co(function *() {
    let result = yield MemberService.memberDetail(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

// 获取会员列表
router.get('/memberList', (req, res, next) => {
  co(function *() {
    let result = yield MemberService.memberList(req)
    res.status(200).send(Result.setData(result))
  }).catch((err) => {
    next(err)
  })
})

module.exports = router
