// WebSocket模块 2017-08
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 3000
})

wss.on('connection', (ws) => {
  console.log('总连接数：' + wss.clients.size)
  // 连接打开
  ws.on('open', () => {
    console.log('client open')
  })

  // 连接关闭
  ws.on('close', () => {
    console.log('client close')
  })

  // error事件
  ws.on('error', (err) => {
    console.log('client error', err)
  })
})

module.exports = wss
