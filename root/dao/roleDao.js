/*
* 角色管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const uuid = require('uuid')
const roleModel = require('../libs/mongo').model('role')

// 检查角色名称是否存在
exports.isRoleNameExist = (req) => {
  return roleModel.findOne({
    name: req.body.name
  }).then((doc) => {
    return !!doc
  })
}

// 添加角色
exports.addRole = (req) => {
  let saveDoc = {
    roleId: uuid.v4(),
    tenantId: req.session.user.tenantId,
    name: req.body.name,
    auth: req.body.auth.toString(),
    desc: req.body.desc || ''
  }
  return roleModel.create(saveDoc)
}

// 编辑角色
exports.editRole = (req) => {
  let roleId = req.body.roleId
  let doc = {}
  if (req.body.name) { // 角色名称
    doc.name = req.body.name
  }
  if (req.body.auth) { // 权限
    doc.auth = req.body.auth.toString()
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return roleModel.updateOne({roleId: roleId}, doc)
}

// 删除角色
exports.deleteRole = (ids) => {
  return roleModel.remove({roleId: {$in: ids}})
}

// 获取角色详情
exports.roleDetail = (roleId) => {
  return roleModel.findOne({roleId: roleId})
}

// 获取角色列表
exports.roleList = (query) => {
  // 分页
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  if (query.name) { // 角色名称
    condition.name = query.name
  }
  return roleModel.find(condition).skip(skip).limit(pageSize)
}

// 获取角色总数 -- 还需要加一个租户id参数
exports.roleTotal = (query) => {
  let condition = {}
  if (query.name) { // 资源名称
    condition.name = query.name
  }
  return roleModel.count(condition)
}
