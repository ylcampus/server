const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const express = require('express')
const app = express()
const portfinder = require('portfinder')
const session = require('express-session')
const uuid = require('uuid')
const setting = require('./bin/setting')
const router = express.Router()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb' // ajax请求body最多为50M
}))
app.use(cookieParser(setting.cookieSecret))
app.use(session({
  secret: setting.cookieSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // maxAge: 60 * 60 * 1000
    maxAge: 10 * 1000
  }
}))

//登录接口
// 对于资源 应该增加一个字段-标识一下要不要做登录校验
app.get('/login', (req, res, next) => {
  // 现在开始模拟登录接口
  let query = {
    username: 'dongjiguo',
    password: 'ule@2015'
  }
  console.log(query)
  // var gapTime = 10 * 60 * 1000 // 间隔时间
  // var cookie = null
  // var session = req.session
  // // 获取cookie值
  // if (session && session.cookie) {
  //   cookie = session.cookie
  // } else {
  //   session.cookie = cookie = uuid.v4()
  // }



  res.status(200).send({
    flag: (new Date()).getTime()
  })
})


app.get('/set', (req, res, next) => {

  var user={
    name:"Chen-xy",
    age:"22",
    address:"bj"
  }
  req.session.user=user;
  res.status(200).send({
    flag: (new Date()).getTime()
  })
})


app.get('/test', (req, res, next) => {
  console.log(req.session)

  req.session.token = uuid.v4()

  if(req.session.user){
    var user=req.session.user;
    var name=user.name;
    res.send('你好'+name+'，欢迎来到我的家园。');
  }else{
    res.send('你还没有登录，先登录下再试试！');
  }
})




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












