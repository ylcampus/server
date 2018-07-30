/*
* 区域管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const co = require('co')
const TreeData = require('../libs/dictionary/area/area.json')
// 获取区域树
exports.areaTree = (req) => {
  return co(function *() {
    return TreeData
  })
}
