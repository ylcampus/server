/*
* 商品表
* @author dongjiguo2008123@126.com
* @date 2018/05
* */
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
  goodsId: { // 商品Id
    type: String,
    required: true
  },
  shopId: { // 店铺Id
    type: String,
    required: true
  },
  title: { // 商品名称
    type: String,
    required: true,
    maxlength: 64
  },
  price: { // 价格
    type: String,
    required: true,
    maxlength: 32
  },
  status: { // 状态 1：出售中 2：库存中
    type: Number,
    required: true,
    enum: [1, 2]
  },
  updateStatus: { // 更新状态 1：新增 2：更新成功；3：更新失败
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  timeStamp: { // 时间戳
    type: Number,
    required: true
  },
  pics: { // 颜色图片
    type: Object,
    required: true,
    default: {}
  },
  descPics: { // 描述图片
    type: Array,
    required: true,
    default: []
  },
  skuList: { // 颜色 尺码 skuid与库存信息
    type: Array,
    required: true,
    default: []
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
