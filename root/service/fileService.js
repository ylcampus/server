/*
* 文件管理
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const co = require('co')
const path = require('path')
const fs = require('fs')
const myfile = require('../libs/file')
const setting = require('../../bin/setting')
// 读取文件目录
exports.readDir = (req) => {
  return co(function *() {
    let baseDir = ''
    let dir = req.body.dir || ''
    if (!dir) {
      let tenantId = req.session.user.tenantId
      if (parseInt(tenantId, 10) === setting.rootTenantId) {
        baseDir = 'system'
      } else {
        // 获取店铺名称
        let shopName = '美津浓官方体验店'
        baseDir = path.join('shop', shopName)
      }
    }
    let realDir = path.join(baseDir, dir)
    return myfile.readDirSync(realDir)
  })
}













// 删除文件(目录)
exports.rmDir = (req) => {
  return co(function *() {
    let fpath = req.body.path || ''
    return myfile.rmDirSync(fpath)
  })
}

// 文件下载
exports.download = (req) => {
  return co(function *() {
    let downPath = path.join(process.env.root, 'static', req.query.path)
    if (!req.query.path) {
      let perr = new Error('参数错误')
      perr.code = 'file.err400002'
      throw perr
    }
    if (!fs.existsSync(downPath)) {
      let err = new Error('文件不存在')
      err.code = 'file.err400001'
      throw err
    }
    return downPath
  })
}

// 文件预览
exports.preview = (req) => {
  return co(function *() {
    let fpath = req.query.path
    if (!fpath) {
      let perr = new Error('参数错误')
      perr.code = 'file.err400002'
      throw perr
    }
    let suffix = fpath.substr(fpath.lastIndexOf('.') + 1)
    if (['pdf', 'txt'].indexOf(suffix) === -1) {
      let perr = new Error('只有pdf与txt后缀文件支持预览')
      perr.code = 'file.err400003'
      throw perr
    }
    let filename = fpath.substr(fpath.lastIndexOf('/') + 1)
    let filePath = path.join('static', filename)
    let stats = fs.statSync(filePath)
    if (!stats.isFile()) {
      let serr = new Error('非文件或文件不存在')
      serr.code = 'file.err400004'
      throw serr
    }
    // 设定content-Type
    let cType = null
    if (suffix === 'pdf') {
      cType = 'application/pdf'
    } else if (suffix === 'txt') {
      cType = 'text/plain'
    }
    // 设定 Content-Disposition
    let cDs = ('inline; filename=' + encodeURIComponent(filename)).trim()
    return {
      cType: cType,
      cDs: cDs,
      filePath: filePath
    }
  })
}
