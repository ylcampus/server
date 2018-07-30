'use strict'
let event = require('../event')
let Log = require('../log')
let crawLog = new Log()
let logpath = 'static/craw'
// 处理日志
let handleLog = (msg) => {
  let flag = msg.flag
  if (flag === 'start') {
    console.log('打开了日志文件')
    crawLog.openSync(logpath, 'craw.txt')
  }
  crawLog.appendLineSync(JSON.stringify(msg))
  if (flag === 'end') {
    console.log('关闭了日志文件')
    crawLog.closeSync()
  }
}

// websocket即时通讯
let handleSocket = () => {}

// 移出监听
let removeEmitter = () => {}

// 添加事件监听
module.exports.onEmitter = () => {
  // 初始化日志

  // 初始化
  event.register('craw', function (msg) {
    // 接下来需要做两件事：1：执行日志；2：websocket
    handleLog(msg)
  })
}

// 反正有一个原则 就是越简单越好
// 现在
