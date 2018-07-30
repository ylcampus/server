/*
* 数据统计表
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
  }
})
