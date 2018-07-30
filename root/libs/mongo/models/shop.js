/*
* 店铺表
* @author dongjiguo2008123@126.com
* @date 2018/06
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  shopId: { // 店铺id
    type: String,
    required: true
  },
  host: { // 域名
    type: String,
    required: true,
    maxlength: 32
  },
  skuId: { // skuId
    type: String,
    required: true
  },
  name: { // 店铺名称
    type: String,
    required: true,
    maxlength: 32
  },
  linkman: { // 联系人
    type: String,
    maxlength: 32
  },
  telephone: { // 联系电话 - 加校验
    type: String
  },
  email: { // 电子邮件 - 加校验
    type: String
  },
  logo: { // logo
    type: String,
    maxlength: 64
  },
  brand: { // 品牌
    type: String,
    required: true,
    maxlength: 64
  },
  banner: { // 顶部图片
    type: String,
    maxlength: 64
  },
  company: { // 公司名称
    type: String,
    maxlength: 64
  },
  address: { // 公司地址
    type: String,
    maxlength: 64
  },
  authority: { // 授权证明
    type: String,
    maxlength: 128
  },
  brief: { // 品牌简介
    type: String,
    maxlength: 256
  },
  desc: { // 资源描述
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
