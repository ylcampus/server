/*
* 用户管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const sha256 = require('js-sha256')
const userModel = require('../libs/mongo').model('user')
const roleModel = require('../libs/mongo').model('role')
const settings = require('../../bin/setting')

// 检查超级管理员账号是否存在
exports.isSuperAdminAccountExist = (req) => {
  return userModel.findOne({
    userId: '10000'
  }).then((doc) => {
    return !!doc
  })
}

// 创建一个超级管理员账号
exports.createSuperAdminAccount = (req) => {
  let saveDoc = {
    userId: '10000', // 用户Id
    tenantId: '10000', // 租户id
    tag: 'root', // 超级管理员
    account: 'root', // 账号
    roleId: '10000', // 用户账号
    pwd: sha256(settings.defaultPwd),
    origin: true, // 是初始密码
    agree: false // 是否同意优乐用户协议
  }
  return userModel.create(saveDoc)
}

// 检查用户账号是否存在
exports.isUseraccountExist = (req) => {
  return userModel.findOne({
    account: req.body.account
  }).then((doc) => {
    return !!doc
  })
}

// 添加用户
exports.addUser = (req) => {
  let saveDoc = {
    userId: uuid.v4(), // 用户Id
    tenantId: req.session.user.userId, // 用户id
    tag: 'user', // 普通用户
    account: req.body.account, // 账号
    roleId: req.body.roleId, // 角色Id
    pwd: sha256(settings.defaultPwd), // 初始密码
    origin: true, // 是初始密码
    agree: false // 是否同意优乐用户协议
  }
  if (req.body.name) { // 姓名
    saveDoc['name'] = req.body.name
  }
  if (req.body.name) { // 性别
    saveDoc['sex'] = parseInt(req.body.sex, 10)
  }
  if (req.body.desc) { // 描述
    saveDoc['desc'] = req.body.desc
  }
  return userModel.create(saveDoc)
}

// 检查电话号码是否存在
exports.isUserTelephoneExist = (req) => {
  return userModel.findOne({
    telephone: req.body.telephone || null
  }).then((doc) => {
    return !!doc
  })
}

// 检查电子邮箱是否存在
exports.isUserEmailExist = (req) => {
  return userModel.findOne({
    email: req.body.email || null
  }).then((doc) => {
    return !!doc
  })
}

// 编辑用户
exports.editUser = (req) => {
  let doc = {}
  if (req.body.roleId) { // 角色Id
    doc.roleId = req.body.roleId
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return userModel.updateOne({userId: req.body.userId}, doc)
}

// 重置用户密码
exports.resetUserPassword = (req) => {
  let userId = req.params.userId
  let doc = {
    pwd: sha256(settings.defaultPwd)
  }
  return userModel.updateOne({userId: userId}, doc)
}

// 获取用户详情
exports.userDetail = (userId) => {
  return userModel.findOne({userId: userId})
}

// 删除用户
exports.deleteUser = (ids) => {
  return userModel.remove({userId: {$in: ids}})
}

// 获取用户列表
exports.userList = (query) => {
  // 分页
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {
    tenantId: query.tenantId
  }
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  if (query.tag) { // 用户标签
    if (query.tag.toString() === '1') {
      condition.tag = 'tenant'
    } else if (query.tag.toString() === '2') {
      condition.tag = 'user'
    }
  }
  return userModel.find(condition).skip(skip).limit(pageSize)
}

// 获取用户总数
exports.userTotal = (query) => {
  let condition = {
    tenantId: query.tenantId
  }
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  if (query.tag) { // 用户标签
    if (query.tag.toString() === '1') {
      condition.tag = 'tenant'
    } else if (query.tag.toString() === '2') {
      condition.tag = 'user'
    }
  }
  return userModel.count(condition)
}

// 获取角色详情
exports.getRoleDetail = (id) => {
  return roleModel.findOne({roleId: id})
}
