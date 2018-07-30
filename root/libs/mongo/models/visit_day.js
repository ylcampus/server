/*
* 数据统计表（按天）
* @author dongjiguo2008123@126.com
* @date 2018/07
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  tenantId: { // 租户id
    type: String,
    required: true
  },
  time: { // 访问时间
    type: String,
    required: true,
    maxlength: 32
  },
  total: { // 访问次数
    type: Number,
    required: true,
    default: 0
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
