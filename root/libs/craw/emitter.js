'use strict'
let event = require('../event')
let Log = require('../log')
const WS = require('../socket')
let crawLog = new Log()
let logpath = 'static/craw'

// 处理日志
let handleLog = (msg) => {
  let flag = msg.flag
  if (flag === 'start') {
    console.log('打开了日志文件')
    crawLog.openSync(logpath, 'craw.txt')
  }
  let appendMap = {
    shopName: msg.shopName,
    goodsName: msg.goodsName,
    execStatus: msg.execStatus,
    timeStamp: msg.timeStamp
  }
  crawLog.appendLineSync(JSON.stringify(appendMap))
  if (flag === 'end') {
    console.log('关闭了日志文件')
    crawLog.closeSync()
  }
}

// 添加事件监听
module.exports.onEmitter = () => {
  event.register('craw', function (msg) {
    handleLog(msg)
    WS.clients.forEach(client => {
      client.send(JSON.stringify(msg))
    })
    // 爬虫程序结束，则移出所有监听器
    if (msg.flag === 'end') {
      event.removeAll()
    }
  })
}
