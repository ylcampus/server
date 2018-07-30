/*
* 角色表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  roleId: { // 角色id
    type: String,
    required: true
  },
  tenantId: { // 租户id
    type: String,
    required: true
  },
  name: { // 角色名称
    type: String,
    required: true,
    maxlength: 32
  },
  auth: { // 权限
    type: String,
    maxlength: 512
  },
  desc: { // 角色描述
    type: String,
    maxlength: 256
  },
  create_at: { // 创建时间
    type: String,
    required: true,
    default: (new Date()).toJSON()
  },
  update_at: { // 最近更新时间
    type: String,
    required: true,
    default: (new Date()).toJSON()
  }
})
