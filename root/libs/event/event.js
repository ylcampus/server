'use strict'
// 事件类 2017-07
const events = require('events')
module.exports = class event {
  constructor () {
    this.events = [] // 监听事件集合
    this.eventEmitter = new events.EventEmitter()
  }
  // 注册一个监听器
  register (msg, fun) {
    let count = this.eventEmitter.listeners(msg).length
    if (!count) {
      this.eventEmitter.addListener(msg, (data) => {
        fun(data)
      })
      let map = {}
      map[msg] = fun
      this.events.push(map)
    } else {
      throw new Error('事件已经被注册')
    }
  }
  // 移除一个监听器
  remove (msg) {
    let target = this.events.find((item) => {
      return Object.keys(item)[0] === msg
    })
    if (target) {
      let idx = this.events.indexOf(target)
      this.eventEmitter.removeAllListeners(msg)
      this.events.splice(idx, 1)
    }
  }
  // 移除所有监听器
  removeAll () {
    this.eventEmitter.removeAllListeners()
  }
  // 判断指定监听事件是否存在
  isExist (msg) {
    let flag = false
    this.events.forEach(row => {
      if (Object.keys(row)[0] === msg) {
        flag = true
      }
    })
    return flag
  }
}
