/*
* 服务器初始化
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
/*
* 关于定时任务的初始化
* 关于超级管理员账号创建
* 采取一切从简的原则
* */
const co = require('co')
const UserService = require('../../root/service/userService')
const TaskService = require('../../root/service/taskService')
module.exports = function (app) {
  return co(function *() {
    // 若超级管理员账号不存在则创建一个
    let existResult = yield UserService.isSuperAdminAccountExist()
    if (!existResult) {
      yield UserService.createSuperAdminAccount()
    }
    // 添加系统定时任务
    yield TaskService.addSystemTask()
  }).catch((err) => {
    throw err
  })
}
