/*
* 用户管理-持久层
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const shopModel = require('../libs/mongo').model('shop')
const userModel = require('../libs/mongo').model('user')
const sha256 = require('js-sha256')
const settings = require('../../bin/setting')

// 检查店铺Id是否存在
exports.isShopIdExist = (req) => {
  return shopModel.findOne({
    shopId: req.body.shopId
  }).then((doc) => {
    return !!doc
  })
}

// 检查域名是否存在
exports.isHostExist = (req) => {
  return shopModel.findOne({
    host: req.body.host
  }).then((doc) => {
    return !!doc
  })
}

// 检查skuid是否存在
exports.isSkuIdExist = (req) => {
  return shopModel.findOne({
    skuId: req.body.skuId
  }).then((doc) => {
    return !!doc
  })
}

// 检查品牌是否存在
exports.isBrandExist = (req) => {
  return shopModel.findOne({
    brand: req.body.brand
  }).then((doc) => {
    return !!doc
  })
}

// 添加店铺
exports.addShop = (req) => {
  let saveDoc = {
    shopId: req.body.shopId.trim(), // 店铺id
    host: req.body.host.trim(), // 域名
    skuId: req.body.skuId.trim(), // skuId
    name: req.body.brand.trim() + '品牌体验店', // 店铺名称
    brand: req.body.brand.trim() // 品牌
  }
  if (req.body.desc) { // 描述
    saveDoc['desc'] = req.body.desc
  }
  return shopModel.create(saveDoc)
}

// 添加根用户 rootTenantId
exports.addRootUser = (req) => {
  let saveDoc = {
    userId: req.body.shopId.trim(),
    name: req.body.brand.trim(),
    tenantId: settings.rootTenantId,
    tag: 'tenant',
    account: req.body.host.trim().split('.')[0],
    roleId: '10000',
    pwd: sha256(settings.defaultPwd),
    desc: req.body.desc || '',
    origin: true,
    agree: false
  }
  return userModel.create(saveDoc)
}

// 删除店铺用户数据 - 有缺陷
exports.deleteAccountData = (shopId) => {
  return userModel.remove({userId: shopId})
}
// 删除店铺
exports.deleteShop = (shopId) => {
  return shopModel.remove({shopId: shopId})
}

// 编辑店铺
exports.editShop = (req) => {
  let shopId = req.body.shopId
  let doc = {}
  if (req.body.linkman) { // 联系人
    doc.linkman = req.body.linkman
  }
  if (req.body.telephone) { // 联系电话
    doc.telephone = req.body.telephone
  }
  if (req.body.email) { // 邮箱
    doc.email = req.body.email
  }
  if (req.body.company) { // 公司名称
    doc.company = req.body.company
  }
  if (req.body.address) { // 公司地址
    doc.address = req.body.address
  }
  if (req.body.brief) { // 品牌简介
    doc.brief = req.body.brief
  }
  if (req.body.logo) { // 商标
    doc.logo = req.body.logo
  }
  if (req.body.banner) { // 横幅
    doc.banner = req.body.banner
  }
  if (req.body.authority) { // 授权证书
    doc.authority = req.body.authority
  }
  if (req.body.desc) { // 描述信息
    doc.desc = req.body.desc
  }
  return shopModel.updateOne({shopId: shopId}, doc)
}

// 获取店铺详情
exports.getShopDetail = (shopId) => {
  return shopModel.findOne({shopId: shopId})
}

// 获取店铺列表
exports.shopList = (query) => {
  // 分页
  let pageSize = parseInt(query.pageSize, 10)
  let pageNo = parseInt(query.pageNo, 10)
  let skip = (pageNo - 1) * pageSize
  let condition = {}
  if (query.search) { // 店铺名称
    condition.name = query.search
  }
  if (query.status) { // 运营状态
    condition.status = parseInt(query.status, 10)
  }
  return shopModel.find(condition).skip(skip).limit(pageSize)
}

// 获取店铺总数
exports.shopTotal = (query) => {
  let condition = {}
  if (query.name) { // 店铺名称
    condition.name = query.name
  }
  if (query.status) { // 运营状态
    condition.status = parseInt(query.status, 10)
  }
  return shopModel.count(condition)
}
