/*
* 会员管理
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const co = require('co')
const MemberDao = require('../dao/memberDao')
const AreaMap = require('../libs/dictionary/area/areaMap.json')

// 删除会员
exports.deleteMember = (req) => {
  return co(function *() {
    let memberId = req.params.memberId
    if (!memberId) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    // 若有未完成订单，则不能删除
    // 若有未使用打折券则不能删除
    return yield MemberDao.deleteMember(memberId)
  })
}

// 冻结、解冻会员账号
exports.freeze = (req) => {
  return co(function *() {
    let memberId = req.body.memberId
    let flag = req.body.flag.toString()
    if (!memberId || !flag || ['1', '2'].indexOf(flag) === -1) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    return yield MemberDao.freeze(req)
  })
}

// 获取会员详情
exports.memberDetail = (req) => {
  return co(function *() {
    let memberId = req.params.memberId
    let result = yield MemberDao.memberDetail(memberId)
    delete result.pwd
    return result
  })
}

// 获取会员列表
exports.memberList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    let result = yield MemberDao.memberList(query)
    for (let i = 0; i < result.length; i++) {
      result[i].province = AreaMap[result[i].province] || result[i].province
      result[i].city = AreaMap[result[i].city] || result[i].city
      result[i].school = AreaMap[result[i].school] || result[i].school
      result[i].campus = AreaMap[result[i].campus] || result[i].campus
    }
    let total = yield MemberDao.memberTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}
