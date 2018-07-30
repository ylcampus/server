// 注册监听函数
let evtObj = require('./root/libs/event')
evtObj.register('craw', (msg) => {
  console.log(msg)
})

// 发送消息
setInterval(() => {
  event.eventEmitter.emit('craw', {name: 1})
}, 2000)
