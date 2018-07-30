/*
* 引导程序
* @author dongjiguo2008123@126.com
* @date 2018/04
* @version 1.0
* */
'use strict'
const path = require('path')
process.env.root = path.resolve(__dirname, '../')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const express = require('express')
const app = express()
const portfinder = require('portfinder')
const setting = require('./setting')
const router = require('../root/router')
const filter = require('../root/libs/filter')
const init = require('./init')
// 设置静态资源文件路径
app.use(express.static(process.env.root + '/dist'))
// 设置模板引擎
app.set('views', path.join(process.env.root, 'views'))
app.set('view engine', 'pug')
// 设置图标
app.use(favicon(path.join(process.env.root, 'favicon.ico')))
// 必须放在路由之前
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
  limit: setting.bodyLimit
}))
// cookie与session
app.use(cookieParser(setting.cookieSecret))
app.use(session({
  secret: setting.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: setting.maxAge
  },
  store: new MongoStore({
    url: setting.db.iam
  })
}))
// 过滤器
app.use('/api', filter)
// 系统初始化
init(app).then(() => {
  console.log('系统初始化成功')
  // 引入路由
  router(app)
  // 启动服务器
  app.listen(setting.port, setting.host)
  module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = setting.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        console.log(`Your application is running here: http://${setting.host}:${port}`)
        resolve()
      }
    })
  })
}).catch((err) => {
  console.log('系统初始化失败')
  console.log(err.message)
})
