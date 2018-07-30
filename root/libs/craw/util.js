'use strict'
const event = require('../event')
// 延时函数
module.exports.delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// 生成一个符合特定正态分布规律的随机时间戳
module.exports.getRandomTime = (policy, min) => {
  let result = []
  if (!min) {
    min = 0
  }
  for (let i = 0; i < 60; i++) {
    let num = parseInt(policy[i], 10)
    let origin = i * 1000 + min
    if (num !== 0) {
      for (let j = 0; j < num; j++) {
        let item = Math.round(origin + Math.random() * 1000)
        result.push(item)
      }
    }
  }
  let idx = Math.floor(Math.random() * 100)
  return result[idx]
}

// 生成一个指定长度的字符串（数字、小写字母与大写字母）
module.exports.generateMixedString = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ''
  for (let i = 0; i < n; i++) {
    let id = Math.ceil(Math.random() * 61)
    res += chars[id]
  }
  return res
}

// 生成一个指定长度的字符串（数字与小写字母）
module.exports.generateString = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ''
  for (let i = 0; i < n; i++) {
    let id = Math.ceil(Math.random() * 35)
    res += chars[id]
  }
  return res
}

// 生成一个指定长度的字符串（大写字母与小写字母）
module.exports.generateMixedChars = (n) => {
  let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let res = ''
  for (let i = 0; i < n; i++) {
    let id = Math.ceil(Math.random() * 51)
    res += chars[id]
  }
  return res
}

// 生成一个指定长度的字符串（纯数字）
module.exports.generateMixedNumber = (n) => {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let res = ''
  for (let i = 0; i < n; i++) {
    let id = Math.ceil(Math.random() * 9)
    res += chars[id]
  }
  return res
}

// 检测对象是否为空
module.exports.isEmpty = (map) => {
  let arr = Object.keys(map)
  return (arr.length === 0)
}

// 触发事件
module.exports.emitMsg = (msg, data) => {
  event.eventEmitter.emit(msg, data || null)
}

// 获取属性Id
module.exports.getPropertyIdFromStr = (str, code) => {
  let arr = str.split(';')
  let target = arr.filter((row) => {
    return row !== ''
  })
  let pId = ''
  for (let i = 0; i < target.length; i++) {
    let pArr = target[i].split(':')
    if (pArr[0] === code) {
      pId = pArr[1]
      break
    }
  }
  return pId
}
