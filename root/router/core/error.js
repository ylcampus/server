/*
* 统一错误处理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
module.exports = function (app) {
  app.use((err, req, res, next) => {
    // 在这里面应该用到一系列的重定向处理--等用到的时候再说吧
    res.status(err.status || 500)
    console.log('统一错误判断，err.status;%s,err.message:%s', err.status, err.message)
    if (req.originalUrl.indexOf('/api/') === 0) { // 来自接口的错误
      res.send({
        code: err.code || -1,
        data: null,
        message: err.message || '未知错误，请联系管理员',
        success: false
      })
    } else { // 来自页面的错误
      res.render('error/error', {
        error: '糟糕，服务器出问题，请联系管理员'
      })
    }
  })
  // 错误页面
  app.use('/error', (req, res, next) => { // 加一层控制器
    res.render('error/error', {
      error: '糟糕，服务器出问题，请联系管理员'
    })
  })
  // 404页面
  app.use((req, res, next) => {
    res.render('error/error', {
      error: '页面不存在'
    })
  })
}
