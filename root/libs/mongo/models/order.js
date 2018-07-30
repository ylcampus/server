/*
* 订单表
* @author dongjiguo2008123@126.com
* @date 2018/07
* */
// orderId discountId goodsId memberId shopId size color address consignee telephone status
// payWay isPay invoice deliveryManId courierNo courierCompany amount
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  orderId: { // 订单Id
    type: String,
    required: true
  },
  discountId: { // 打折券Id
    type: String,
    required: true
  },
  goodsId: { // 商品Id
    type: String,
    required: true
  },
  goodsName: { // 商品名称
    type: String,
    required: true
  },
  memberId: { // 会员Id
    type: String,
    required: true
  },
  shopId: { // 店铺id
    type: String,
    required: true
  },
  shopName: { // 店铺名称
    type: String,
    required: true
  },
  color: { // 颜色
    type: String,
    required: true,
    maxlength: 32
  },
  size: { // 尺码
    type: String,
    required: true,
    maxlength: 32
  },
  address: { // 收货地址
    type: String,
    required: true,
    maxlength: 128
  },
  consignee: { // 联系人
    type: String,
    required: true,
    maxlength: 32
  },
  telephone: { // 联系电话
    type: String,
    required: true,
    maxlength: 32
  },
  status: { // 状态 1：待付款 2:待发货 3:已发货 4:已完成 5:已取消
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  payWay: { // 支付方式（目前只支持微信支付） 1：货到付款 2:微信 3:支付宝
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  isPay: { // 是否已付款 true 已支付：false:未支付 courierNo courierCompany amount
    type: Boolean,
    required: true
  },
  deliveryManId: { // 发货人Id
    type: String,
    maxlength: 64
  },
  courierNo: { // 快递单号
    type: String,
    maxlength: 64
  },
  company: { // 快递公司
    type: String,
    maxlength: 64
  },
  desc: { // 备注信息
    type: String,
    maxlength: 32
  },
  amount: { // 订单总金额
    type: Number,
    required: true
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
