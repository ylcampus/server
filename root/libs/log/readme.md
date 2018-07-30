// 创建日志文件
let Log = require('./root/libs/log')
let crawLog = new Log()
let logpath = 'static/craw'
crawLog.openSync(logpath, 'craw.txt')
let map = {name: 'dongjiguo'}
crawLog.appendLineSync(JSON.stringify(map))
crawLog.appendLineSync(JSON.stringify(map))
crawLog.appendLineSync(JSON.stringify(map))
crawLog.closeSync()
// 读取日志文件
let Log = require('./root/libs/log')
let crawLog = new Log()
crawLog.readFile('static/craw/craw.txt', (err, data) => {
  let arr = JSON.parse('[' + data + ']')
  console.log(arr)
})
