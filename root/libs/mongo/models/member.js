/*
* 会员表
* @author dongjiguo2008123@126.com
* @date 2018/07
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  memberId: { // 会员Id
    type: String,
    required: true
  },
  account: { // 账号
    type: String,
    required: true,
    maxlength: 32
  },
  pwd: { // 密码
    type: String,
    required: true,
    maxlength: 64
  },
  tag: { // 标签 visit:访客；member:会员
    type: String,
    required: true,
    enum: ['visit', 'member']
  },
  name: { // 姓名
    type: String,
    maxlength: 32
  },
  sex: { // 性别 1：男；2：女
    type: String,
    enum: [1, 2]
  },
  status: { // 在线状态 1：离线 2：在线
    type: String,
    enum: [1, 2]
  },
  freeze: { // 冻结状态 false：正常；true：账号被冻结
    type: Boolean,
    required: true,
    default: false
  },
  telephone: { // 联系电话 - 加校验
    type: String
  },
  email: { // 电子邮件 - 加校验
    type: String
  },
  province: { // 省
    type: String,
    maxlength: 64
  },
  city: { // 市
    type: String,
    maxlength: 64
  },
  school: { // 区
    type: String,
    maxlength: 64
  },
  campus: { // 学校
    type: String,
    maxlength: 64
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
