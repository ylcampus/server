/*
* 用户管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const taskModel = require('../libs/mongo').model('task')
const userModel = require('../libs/mongo').model('user')
// 检查定时任务是否存在
exports.isTaskExist = (taskId) => {
  return taskModel.findOne({
    taskId: taskId
  }).then((doc) => {
    return !!doc
  })
}

// 检查同租户下定时任务名称是否存在
exports.isTaskNameExist = (req) => {
  return taskModel.findOne({
    name: req.body.name,
    tenantId: req.session.tenantId
  }).then((doc) => {
    return !!doc
  })
}

// 检查同类型的定时任务是否存在
exports.isSameTypeTaskExist = (req) => {
  return taskModel.findOne({
    module: req.body.module,
    handle: req.body.handle,
    tenantId: req.session.tenantId
  }).then((doc) => {
    return doc
  })
}

// 添加定时任务
exports.addTask = (saveDoc) => {
  return taskModel.create(saveDoc)
}

// 获取定时任务详情
exports.getTaskDetail = (taskId) => {
  return taskModel.findOne({taskId: taskId})
}

// 编辑定时任务
exports.editTask = (req) => {
  let id = req.body.id
  let doc = {}
  if (req.body.name) { // 名称
    doc.name = req.body.name
  }
  if (req.body.type) { // 类型
    doc.type = parseInt(req.body.type, 10)
  }
  if (req.body.module) { // 所属模块
    doc.module = req.body.module
  }
  if (req.body.handle) { // 处理函数
    doc.handle = req.body.handle
  }
  if (req.body.params) { // 入参
    doc.params = req.body.params
  }
  if (req.body.ready) { // 就绪状态
    doc.ready = req.body.ready
  }
  if (req.body.rule) { // 定时规则
    doc.rule = req.body.rule
  }
  if (req.body.desc) { // 描述
    doc.desc = req.body.desc
  }
  return taskModel.updateOne({id: id}, doc)
}

// 获取定时任务列表
exports.taskList = (query) => {
  // 分页
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  if (query.key) { // 用户名称
    condition.name = query.key
  }
  if (query.tag) { // 标签 系统 or 租户
    condition.tag = parseInt(query.tag, 10)
  }
  return taskModel.find(condition).skip(skip).limit(pageSize)
}

// 获取定时任务总数
exports.taskTotal = (query) => {
  let condition = {}
  if (query.key) { // 用户名称
    condition.name = query.key
  }
  if (query.tag) { // 标签 系统 or 租户
    condition.tag = parseInt(query.tag, 10)
  }
  return taskModel.count(condition)
}

// 获取租户信息
exports.userDetail = (condition) => {
  return userModel.findOne(condition)
}
