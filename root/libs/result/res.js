/**
 * @name 相应体处理
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
module.exports = class res {
  constructor (code, msg, data) {
    this.code = 0
    this.success = true
    this.message = null
    this.data = data || null
  }
  setData (data) { // 设置数据
    this.data = data
    return this
  }
  getData () { // 获取数据
    return this.data
  }
  setCode (code) { // 设置code
    this.code = code
    return this
  }
  getCode () { // 获取code
    return this.code
  }
  setMsg (msg) { // 设置信息
    this.message = msg
    return this
  }
  getMsg () { // 获取信息
    return this.message
  }
}
