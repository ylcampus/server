/*
* 页面路由
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
let path = require('path')
module.exports = function (app) {
  // 商家管理平台
  app.use('/seller', (req, res, next) => {
    res.sendfile(path.join(process.env.root, 'dist/admin/index.html'))
  })
  // 官方管理平台
  app.use('/', (req, res, next) => {
    console.log(123)
    res.sendFile(path.join(process.env.root, 'dist/index.html'))
  })
}
