/**
 * @name 启动定时任务
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let schedule = require('node-schedule')
const taskMap = require('./map')
// 引入数据库
module.exports = class event {
  constructor () {
    this.list = {} // 定时任务列表
    this.taskMap = taskMap
  }
  /**
   * @name 添加定时任务
   * @param  task -定时任务
   * @returns id -定时任务id
   */
  add (task) {
    /*
    * 检查定时任务是否已添加，若是则直接返回，否则添加定时任务
    * 到列表并启动定时任务
    * */
    let target = this.list[task.id]
    if (!target && task.ready && task.taskId) {
      let moduleName = task.module + 'Task'
      if (!this.taskMap[moduleName] || !this.taskMap[moduleName][task.handle]) {
        throw new Error('定时任务处理函数未注册')
      }
      let handle = this.taskMap[moduleName][task.handle](task.taskId, task.params)
      task.j = schedule.scheduleJob(task.rule, handle)
      // 添加定时任务到定时任务列表
      let map = {}
      map[task['taskId']] = task
      this.list = {...this.list, ...map}
      task.status = 'pending'
    }
    return task.id
  }

  /**
   * @name 改变定时任务状态
   * @param  id -定时任务id
   * @returns
   */
  changeStatus (id, flag) {
    let target = this.list[id]
    if (target) {
      if (flag === 1) {
        this.list[id].status = 'runing'
      } else if (flag === 2) {
        this.list[id].status = 'pending'
      }
    }
  }

  /**
   * @name 获取定时任务状态
   * @param  id -定时任务id
   * @returns
   */
  getStatus (id) {
    let target = this.list[id]
    if (target) {
      return this.list[id].status
    } else {
      return 'pending'
    }
  }

  /**
   * @name 获取单个定时任务（定时任务列表）
   * @param id -定时任务id
   * @returns
   */
  getDetail (id) {
    if (id) {
      return this.list[id]
    } else {
      return this.list
    }
  }

  /**
   * @name 获取定时任务状态
   * @param  id -定时任务id
   * @returns
   */
  restart (id, rule, params) {
    let target = this.list[id]
    if (target) {
      if (target.status === 'runing') {
        throw new Error('运行中的定时任务不允许执行重启操作')
      }
      target.rule = rule
      target.params = params
      let j = target.j
      if (j) {
        // 先取消
        j.cancel()
        // 再重新创建
        let moduleName = target.module + 'Task'
        let handle = this.taskMap[moduleName][target.handle](target.taskId, target.params)
        this.list[id].j = schedule.scheduleJob(target.rule, handle)
      }
    }
  }
}
