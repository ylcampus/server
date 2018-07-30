/**
 * @name 表格类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
const fs = require('fs')
let path = require('path')
const xlsx = require('better-xlsx')
let Sheet = require('./sheet')
module.exports = class excel {
  constructor (name) {
    this.name = name
    this.file = new xlsx.File()
    this.sheets = [] // 工作簿集
  }
  // 添加一个工作簿
  addSheet (name) {
    let rSheet = this.file.addSheet(name)
    let sheet = new Sheet(rSheet)
    this.sheets.push(sheet)
    return sheet
  }
  // 保存文件
  save (name, dir) {
    // 写成promise形式
    // 错误检测
    const len = this.sheets.length
    if (len === 0) {
      throw new Error('请添加工作簿')
    }
    for (var i = 0; i < len; i++) {
      this.sheets[i]._execute() // 执行创建表格的操作
    }
    // ok 开始从这个地方入手
    let saveTo = path.join(__dirname, '/complex2.xlsx')
    this.file.saveAs().pipe(fs.createWriteStream(saveTo)).on('finish', () => {
      console.log('Done.')
    })
  }
}
