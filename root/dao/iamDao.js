/*
* Iam模块-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const userModel = require('../libs/mongo').model('user')
const memberModel = require('../libs/mongo').model('member')

// 获取用户信息 - 应该修改为账号或密码 - 之后再增加吧 -今天不想写
exports.getUserMsg = (req) => {
  let account = req.body.account
  return userModel.findOne({account: account})
}
// 检测账号或手机号是否存在
exports.isUserAccountExist = (req) => {
  return userModel.findOne({
    account: req.body.account || null
  }).then((doc) => {
    return !!doc
  })
}
// 根据账号名获取用户基本信息
exports.getUserBasicMsg = (req) => {
  return userModel.findOne({
    account: req.body.account
  })
}
// 检测手机号是否存在
exports.isTelephoneExist = (req) => {
  return userModel.findOne({
    telephone: req.body.telephone
  }).then((doc) => {
    return !!doc
  })
}
// 修改密码并绑定手机号
exports.modifyPwdAndBindTelephone = (req) => {
  let account = req.body.account
  let doc = {
    telephone: req.body.telephone,
    pwd: req.body.newPassword,
    origin: false
  }
  return userModel.updateOne({account: account}, doc)
}
// 更换手机号
exports.updateTelephone = (req) => {
  let userId = req.session.user.userId
  let doc = {
    telephone: req.body.telephone
  }
  return userModel.updateOne({userId: userId}, doc)
}
// 找回密码
exports.backPwd = (req) => {
  let telephone = req.session.telephone
  let doc = {
    pwd: req.body.pwd
  }
  return userModel.updateOne({telephone: telephone}, doc)
}
// 检查老密码是否正确
exports.isValidOldPwd = (req) => {
  let userId = req.session.user.userId
  return userModel.findOne({
    userId: userId,
    pwd: req.body.oldPassword
  }).then((doc) => {
    return !!doc
  })
}
// 修改密码
exports.modifyPwd = (req) => {
  let userId = req.session.user.userId
  let doc = {
    pwd: req.body.newPassword,
    origin: false
  }
  console.log(req.session.id)
  return userModel.updateOne({userId: userId}, doc)
}

// 获取个人信息
exports.getBasicMsg = (req) => {
  return userModel.findOne({userId: req.session.user.userId})
}

// 检查电子邮件是否存在
exports.isEmailExist = (req) => {
  return userModel.findOne({
    email: req.body.email || null
  }).then((doc) => {
    return !!doc
  })
}

// 编辑个人基本信息
exports.editBasicMsg = (req) => {
  let doc = {}
  if (req.body.name) { // 姓名
    doc.name = req.body.name
  }
  if (req.body.sex) { // 性别
    doc.sex = parseInt(req.body.sex, 10)
  }
  if (req.body.email) { // 电子邮箱
    doc.email = req.body.email
  }
  return userModel.updateOne({userId: req.session.user.userId}, doc)
}

// 检查会员账号是否存在
exports.isMemberAccountExist = (req) => {
  return memberModel.findOne({
    account: req.body.account
  }).then((doc) => {
    return !!doc
  })
}

// 会员注册
exports.register = (req) => {
  let saveDoc = {
    memberId: uuid.v4(), // 会员Id
    account: req.body.account, // 账号
    tag: 'member', // 普通用户
    name: '董文轩',
    telephone: '18205185737',
    province: '3200000',
    city: '3201000',
    school: '3201010',
    campus: '3201011',
    pwd: req.body.pwd, // 密码
    status: '2', // 在线状态 1：离线 2 在线
    freeze: false // 是否同意优乐用户协议
  }
  return memberModel.create(saveDoc)
}
