/*
* 定时任务表表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  taskId: { // 定时任务id
    type: String,
    required: true
  },
  tenantId: { // 租户id
    type: String,
    required: true
  },
  tenantName: { // 租户名称
    type: String
  },
  type: { // 时间类型 1：每天；2：每周；3：每月
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  name: { // 定时任务名称
    type: String,
    required: true,
    maxlength: 32
  },
  tag: { // 标签 1：系统；2：租户
    type: Number,
    required: true,
    enum: [1, 2]
  },
  module: { // 所属模块 -- 最后再改成枚举类型
    type: String,
    required: true,
    maxlength: 32
  },
  handle: { // 处理函数
    type: String,
    required: true,
    maxlength: 32
  },
  params: { // 参数
    type: Object
  },
  ready: { // 就绪状态 true 已启用：false:未启用
    type: Boolean,
    required: true
  },
  rule: { // 定时规则
    type: String,
    required: true,
    maxlength: 64
  },
  status: { // 运行状态 runing：运行中；pending：挂起中
    type: String,
    required: true,
    enum: ['runing', 'pending']
  },
  desc: { // 描述
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
