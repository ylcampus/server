// 日志操作类 2018-07
'use strict'
const fs = require('fs')
const path = require('path')
const os = require('os')
module.exports = class dir {
  constructor () {
    this.model = 'r+' // 读写模式
    this.fd = null // 文件描述符
  }
  // 打开一个日志文件
  openSync (dir, filename) {
    if (!fs.existsSync(dir)) {
      this.mkDirSync(dir)
    }
    let logpath = path.join(dir, filename)
    fs.writeFileSync(logpath, '')
    this.fd = fs.openSync(logpath, this.model)
  }

  // 向日志文件中追加一行数据（同步方法）
  appendLineSync (data) {
    fs.appendFileSync(this.fd, data + ',' + os.EOL)
  }

  // 关闭一个日志文件
  closeSync () {
    fs.closeSync(this.fd)
  }

  // 读取日志文件
  readFile (logpath, cb) {
    fs.readFile(logpath, function (err, data) {
      if (err) {
        cb(err)
      } else {
        let str = data.toString('utf8').trim()
        let backStr = str.substring(0, str.length - 1)
        cb(err, backStr)
      }
    })
  }

  // 创建目录
  mkDirSync (dir) {
    this._mkDirSync(dir)
  }

  // 递归函数
  _mkDirSync (dir) {
    if (fs.existsSync(dir)) {
      return true
    } else {
      if (this._mkDirSync(path.dirname(dir))) {
        fs.mkdirSync(dir)
        return true
      }
    }
  }
}
