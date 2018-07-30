/**
 * @name excel报表操作模块
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let Excel = require('./excel')
// 获取一个实例
module.exports.create = (name) => {
  return new Excel(name)
}
