/*
* 路由部分
* @author dongjiguo2008123@126.com
*
* @date 2018/04
* */
'use strict'
module.exports = function (app) {
  // 接口路由
  app.use('/api', require('./core/apiRouter'))
  // 页面路由
  require('./core/pageRouter')(app)
  // 异常处理
  require('./core/error')(app)
}
