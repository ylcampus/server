#时间管理公共类
let Time = require('./root/libs/time')
let map = {
  week: 2,
  hour: 18,
  minute: 38,
  second: 0
}
let rule = Time.timeToRule(map)
let schedule = require('node-schedule')
schedule.scheduleJob(rule, () => {
  console.log('定时任务已经启动')
})
