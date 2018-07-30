/**
 * @name 组件
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
/**
 * @name 把时间转换成定时任务规则
 * @param  task -定时任务
 * @returns id -定时任务id
 */
module.exports.timeToRule = (map) => {
  const defaultMap = {
    week: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null
  }
  let newMap = {...defaultMap, ...map}
  let rArr = ['*', '*', '*', '*', '*', '*']
  if (newMap.second !== null) {
    rArr[0] = newMap.second
  }
  if (newMap.minute !== null) {
    rArr[1] = newMap.minute
  }
  if (newMap.hour !== null) {
    rArr[2] = newMap.hour
  }
  if (newMap.day !== null) {
    rArr[3] = newMap.day
  }
  if (newMap.month !== null) {
    rArr[4] = newMap.month
  }
  if (newMap.week !== null) {
    rArr[5] = newMap.week
  }
  return rArr.join(' ').trim()
}

/**
 * @name 指定位数的随机数
 * @param n
 * @returns String
 */
module.exports.getRandomNumber = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let res = ''
  for (let i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 9)
    res += chars[id]
  }
  return res
}

/**
 * @name 获取权限键值
 * @param originalUrl 源url
 * @returns authKey
 */
module.exports.getAuthKey = (originalUrl) => {
  let arr = originalUrl.substr(1).split('/')
  let resultArr = []
  for (let i = 0; i < 3; i++) {
    let str = arr[i]
    let target = (i === 0) ? str : str.charAt(0).toUpperCase() + str.slice(1)
    resultArr.push(target.trim())
  }
  return resultArr.join('').split('?')[0].trim()
}

/**
 * @name 获取权限坐标
 * @param tag 用户角色标签
 * @returns axis 权限坐标
 */
module.exports.getAuthAxis = (tag) => {
  return {
    root: 0,
    tenant: 1,
    member: 2,
    visit: 3
  }[tag]
}

/**
 * @name 获取时刻
 */
module.exports.getQuarater = () => {
  let time = new Date()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let quarter = ''
  if (minute <= 15) {
    quarter = '15'
  } else if (minute > 15 && minute <= 30) {
    quarter = '30'
  } else if (minute > 30 && minute <= 45) {
    quarter = '45'
  } else if (minute > 45) {
    quarter = '00'
    // ? 这个地方会出现24的情况
    hour++
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  return hour + ':' + quarter
}

/**
 * @name 获取当前日期
 */
module.exports.getDate = () => {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1 > 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
  return year + '-' + month + '-' + date
}









