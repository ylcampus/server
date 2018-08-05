/*
* 店铺管理
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
'use strict'
const co = require('co')
const sha256 = require('js-sha256')
const ShopDao = require('../dao/shopDao')
const setting = require('../../bin/setting')
const Craw = require('../libs/craw')
// 添加店铺
exports.addShop = (req) => {
  return co(function *() {
    let shopId = req.body.shopId
    let host = req.body.host
    let skuId = req.body.skuId
    let brand = req.body.brand
    // 检查参数是否正确
    if (!shopId || !host || !skuId || !brand) {
      let err = new Error('参数错误')
      err.code = 'shop.err400001'
      throw err
    }
    // 检查店铺名称是否存在
    let shopIdResult = yield ShopDao.isShopIdExist(req)
    if (shopIdResult) {
      let err = new Error('店铺名称已经存在')
      err.code = 'shop.err400002'
      throw err
    }
    // 检查域名是否存在
    let hostResult = yield ShopDao.isHostExist(req)
    if (hostResult) {
      let err = new Error('域名已经存在')
      err.code = 'shop.err400003'
      throw err
    }
    // 检查skuid是否存在
    let skuIdResult = yield ShopDao.isSkuIdExist(req)
    if (skuIdResult) {
      let err = new Error('skuId已经存在')
      err.code = 'shop.err400004'
      throw err
    }
    // 检查品牌是否存在
    let brandResult = yield ShopDao.isBrandExist(req)
    if (brandResult) {
      let err = new Error('品牌已经存在')
      err.code = 'shop.err400005'
      throw err
    }
    // 添加租户根用户
    yield ShopDao.addRootUser(req)
    // 创建店铺
    return yield ShopDao.addShop(req)
  })
}

// 删除店铺
exports.deleteShop = (req) => {
  return co(function *() {
    let shopId = req.params.shopId
    if (!shopId) {
      let err = new Error('参数错误')
      err.code = 'shop.err400001'
      throw err
    }
    // 检查店铺订单数据，若有未完成订单，则店铺不能删除
    // 检查店铺打折券数据，若有未使用打折券则不能删除
    // 店铺中所有商品下架
    // 删除店铺用户数据
    yield ShopDao.deleteAccountData(shopId)
    // 删除店铺
    return yield ShopDao.deleteShop(shopId)
  })
}

// 编辑店铺
exports.editShop = (req) => {
  return co(function *() {
    let shopId = req.body.shopId
    if (!shopId) {
      let err = new Error('参数错误')
      err.code = 'shop.err400001'
      throw err
    }
    // 编辑店铺
    return yield ShopDao.editShop(req)
  })
}

// 获取店铺详情
exports.shopDetail = (req) => {
  return co(function *() {
    let shopId = req.params.shopId
    if (!shopId) {
      let err = new Error('参数错误')
      err.code = 'shop.err400001'
      throw err
    }
    return yield ShopDao.getShopDetail(shopId)
  })
}

// 获取店铺列表
exports.shopList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'shop.err400004'
      throw err
    }
    let result = yield ShopDao.shopList(query)
    let total = yield ShopDao.shopTotal(query)
    let backMap = {
      rows: result,
      total: total
    }
    return backMap
  })
}

// 爬取商品
exports.crawData = (req) => {
  return co(function *() {
    const pwd = req.body.pwd
    const shopId = req.body.shopId
    const isRuning = Craw.ShopObj.isRuning
    // 参数校验
    if (!pwd || !shopId) {
      let err = new Error('参数错误')
      err.code = 'shop.err400001'
      throw err
    }
    // 检测是否有运行中的爬虫任务
    if (isRuning) {
      let err = new Error('爬虫程序已经启动')
      err.code = 'shop.err400005'
      throw err
    }
    // 密码校验
    if (pwd !== sha256(setting.crawPwd)) {
      let err = new Error('密码错误')
      err.code = 'shop.err400006'
      throw err
    }
    // 获取店铺详细信息
    let shopMsg = yield ShopDao.getShopDetail(shopId)
    let hostname = shopMsg.host
    let skuid = shopMsg.skuId
    Craw.ShopObj.crawShopData(hostname, shopId, skuid).then((res) => {
      if (res.code * 1 === 0) {
        console.log('爬虫对象初始化')
        Craw.ShopObj.init()
      }
    })
    return {
      code: 0,
      data: null
    }
  })
}

// 获取执行日志数据
exports.getCrawLogData = (req) => {
  return co(function *() {
    return {
      code: 0,
      data: {
        name: 'dongjiguo'
      }
    }
  })
}
