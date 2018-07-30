/*
* 会员管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/07
* */
'use strict'
const memberModel = require('../libs/mongo').model('member')

// 获取会员详情
exports.memberDetail = (memberId) => {
  return memberModel.findOne({memberId: memberId})
}

// 删除会员
exports.deleteMember = (memberId) => {
  return memberModel.remove({memberId: memberId})
}

// 启用、禁用会员账号
exports.freeze = (req) => {
  let flag = req.body.flag.toString()
  let doc = {}
  if (flag === '1') {
    doc.freeze = false
  } else if (flag === '2') {
    doc.freeze = true
  }
  return memberModel.updateOne({memberId: req.body.memberId}, doc)
}

// 获取会员列表
exports.memberList = (query) => {
  // 分页
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  if (query.areaId) { // 区域
    condition.areaId = query.areaId
  }
  if (query.status) { // 在线状态
    condition.status = query.status
  }
  return memberModel.find(condition).skip(skip).limit(pageSize)
}

// 获取会员总数
exports.memberTotal = (query) => {
  let condition = {}
  if (query.key) { // 搜索关键字
    condition.name = query.key
  }
  if (query.areaId) { // 区域
    condition.areaId = query.areaId
  }
  if (query.status) { // 在线状态
    condition.status = query.status
  }
  return memberModel.count(condition)
}
