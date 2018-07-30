/**
 * @name 目录操作类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
let fs = require('fs')
let path = require('path')
const setting = require('../../../bin/setting')
module.exports = class dir {
  constructor () {
    this.dir = setting.rootStatisDir
    this.rootPath = process.env.rootPath
  }
  /**
   * @name 读取文件目录
   * @param dir 文件目录
   * @returns none
   */
  readDirSync (dir) {
    let realDir = path.join(this.dir, dir)
    if (!fs.existsSync(realDir)) { // 检查路径是否存在
      throw new Error('路径不存在')
    }
    let menu = fs.readdirSync(realDir)
    let files = []
    for (let i = 0; i < menu.length; i++) {
      let filename = menu[i]
      let filepath = path.join(realDir, filename)
      let stat = fs.statSync(filepath)
      let backPath = path.join(dir, filename).split('\\').join('\\\\')
      let map = {
        name: filename, // 名称
        path: backPath, // 路径
        birthtime: stat.birthtime // 创建时间
      }
      if (stat.isDirectory()) {
        map.flag = 'dir'
      } else {
        map.flag = 'file'
        map.type = filename.substring(filename.lastIndexOf('.') + 1)
        map.size = stat.size
      }
      files.push(map)
    }
    return files
  }

  /**
   * @name 创建目录
   * @param dir 工作目录
   * @returns none
   */
  mkDirSync (dir) {
    if (!dir) {
      throw new Error('路径名称不能为空')
    }
    let realDir = path.join(this.dir, dir)
    this._mkDirSync(realDir)
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

  /**
   * @name 删除文件(目录)
   * @param file 待删除文件或目录 - 幂等
   * @returns none
   */
  rmDirSync (fpath) {
    if (fpath) {
      let realPath = path.join(this.dir, fpath)
      if (fs.existsSync(realPath)) {
        if (fs.statSync(realPath).isFile()) { // 是文件则直接删除
          fs.unlinkSync(realPath)
        } else {
          this._rmDirSync(realPath)
        }
      }
    }
  }

  // 递归函数
  _rmDirSync (filePath) {
    let files = fs.readdirSync(filePath)
    for (let i = 0; i < files.length; i++) {
      let curPath = filePath + '/' + files[i]
      if (fs.statSync(curPath).isDirectory()) {
        this._rmDirSync(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    }
    // 删除目录
    fs.rmdirSync(filePath)
  }
}
