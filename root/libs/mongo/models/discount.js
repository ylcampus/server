/*
* 打折券表
* @author dongjiguo2008123@126.com
* @date 2018/07
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  discountId: { // 打折券Id
    type: String,
    required: true
  },
  shopId: { // 店铺Id
    type: String,
    required: true
  },
  shopName: { // 店铺名称
    type: String,
    required: true,
    maxlength: 32
  },
  memberId: { // 会员Id
    type: String
  },
  memberAccount: { // 会员账号
    type: String,
    maxlength: 32
  },
  goodsId: { // 商品Id
    type: String
  },
  goodsName: { // 商品名称
    type: String,
    maxlength: 32
  },
  type: { // 类型 1 一折券 2 二折券 3 三折券 4 四折券 5 五折券
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  status: { // 状态 1：未领取 2：未使用 3：已使用 4 已完成
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
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
