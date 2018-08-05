// 爬取整个店铺的数据 2018-07
'use strict'
const request = require('request')
const j = request.jar()
const co = require('co')
const config = require('../config/config')
const util = require('../util')
const crawService = require('../../../service/crawService')
const Goods = require('./goods')
const Emitter = require('../emitter')
// 构造函数
let ShopClass = function () {
  this.isRuning = false
  this.shopName = '--' // 店铺名称
  this.totalPage = 0 // 总页数
  this.currentPage = 1 // 当前页
  this.pageSize = 24 // 每页大小
  this.totalResults = 0 // 总商品数
  this.goodsName = '--' // 商品名称
  this.timeStamp = (new Date()).getTime() // 时间戳
  this.updateSuccess = 0 // 更新成功商品数
  this.updateFailed = 0 // 更新失败商品数
  this.notUpdate = 0 // 未更新商品数
  this.addSuccess = 0 // 新增成功商品数
  this.addFailed = 0 // 新增失败商品数
  this.execStatus = null
}

// 获取spm
let _getSpm = () => {
  let arr = []
  arr.push(util.generateMixedString(5))
  arr.push(util.generateMixedNumber(7))
  arr.push(0)
  arr.push(0)
  arr.push(util.generateMixedString(14))
  return arr.join('.')
}

// 获取referer
let _getReferer = (spm, suid, hostname) => {
  let uri = config.page.uri
  // 拼接referer字符串
  let rArr = []
  let query = {
    spm: spm,
    suid: suid,
    sort: 'default'
  }
  for (let idx in query) {
    let rStr = idx + '=' + query[idx]
    rArr.push(rStr)
  }
  let serch = rArr.join('&')
  // 拼接referer
  let uarr = []
  uarr.push(uri.protocol)
  uarr.push('://')
  uarr.push(hostname)
  uarr.push(':' + uri.port)
  uarr.push(uri.pathHtml)
  return (uarr.join('') + '?' + serch).trim()
}

// 获取url
let _getOption = (hostname, shopId, suid, p) => {
  let options = {
    url: null,
    headers: config.page.headers,
    jar: j,
    gzip: true
  }
  // 拼接search字符串
  let uri = config.page.uri
  let query = uri.query
  query.spm = _getSpm()
  query.shop_id = shopId
  query.callback = 'jsonp_1' + util.generateMixedNumber(7)
  query.suid = suid
  query.p = p.toString()
  let arr = []
  for (let idx in query) {
    let qStr = idx + '=' + query[idx]
    arr.push(qStr)
  }
  let serch = arr.join('&')
  // 拼接url
  let uarr = []
  uarr.push(uri.protocol)
  uarr.push('://')
  uarr.push(hostname)
  uarr.push(':' + uri.port)
  uarr.push(uri.pathname)
  options.url = uarr.join('').trim() + '?' + serch.trim()
  // 拼接path字符串
  options.headers.path = (uri.pathname + '?' + serch).trim()
  options.headers.referer = _getReferer(query.spm, suid, hostname)
  return options
}

// 为url生成cookie
let _setCookieToUrl = (url) => {
  let realCookie = config.page.cookie
  realCookie.cna = util.generateMixedString(24)
  realCookie.tk_trace = '1'
  realCookie._m_h5_tk = util.generateString(32) + '_1' + util.generateMixedNumber(12)
  realCookie._m_h5_tk_enc = util.generateString(32)
  realCookie.isg = util.generateMixedChars(64)
  // 为url这是cookie
  for (let idx in realCookie) {
    let cStr = idx + '=' + realCookie[idx]
    let cok = request.cookie(cStr)
    j.setCookie(cok, url)
  }
}

// 获取json对象
let _getJsonFromJsonp = (jsonp) => {
  let len = jsonp.trim().length
  let jsonStr = jsonp.trim().substring(15, len - 1)
  return JSON.parse(jsonStr)
}

// 爬取单页数据
let _crawPageData = (hostname, shopId, suid, p) => {
  return new Promise((resolve) => {
    co(function *() {
      // 获取options
      let freshOptions = _getOption(hostname, shopId, suid, p)
      // 设置cookie
      _setCookieToUrl(freshOptions.url)
      request.get(freshOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          // let cookieMap = j.getCookieString(freshOptions.url)
          let jsonObj = _getJsonFromJsonp(body)
          resolve({
            code: 0,
            data: jsonObj
          })
        } else {
          resolve({
            code: -1,
            message: error.message
          })
        }
      })
    }).catch((err) => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

// 获取店铺商品数据
let _getShopGoodsMsg = (hostname, shopId, suid) => {
  return new Promise((resolve) => {
    co(function *() {
      let shopMsg = yield _crawPageData(hostname, shopId, suid, 1)
      resolve({
        code: 0,
        data: shopMsg.data || {}
      })
    }).catch((err) => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

// 爬取商品列表数据
ShopClass.prototype._crawGoodsList = function (hostname, shopId, suid) {
  return new Promise((resolve) => {
    co(function *() {
      // const totalPage = self.totalPage
      const totalPage = 1
      let backArr = []
      for (let i = 1; i <= totalPage; i++) {
        // 反扒延时策略
        let time = util.getRandomTime(config.policy, config.page.min)
        yield util.delay(time)
        let pageResult = yield _crawPageData(hostname, shopId, suid, i)
        let target = pageResult.data
        if (pageResult.code * 1 === 0 && target) {
          let items = target.items || []
          for (let j = 0; j < items.length; j++) {
          // for (let j = 0; j < 3; j++) {
            let map = {
              goodsId: items[j].item_id,
              currentPage: i
            }
            backArr.push(map)
          }
        }
      }
      resolve({
        code: 0,
        data: backArr
      })
    }).catch((err) => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

// 爬取商品详情数据
ShopClass.prototype._crawGoodsDetailData = function (hostname, goodsId) {
  let self = this
  return new Promise((resolve) => {
    co(function *() {
      // 执行状态 1：更新成功 2：更新失败 3：未更新 4：新增 5：新增失败
      let execStatus = ''
      let goodsDeatilResult = yield crawService.getGoodsDetailMsg(goodsId)
      if (goodsDeatilResult.code * 1 === 0) {
        let GoodsObj = new Goods()
        if (goodsDeatilResult.data) {
          self.goodsName = goodsDeatilResult.data.title || ''
          let nowTime = (new Date()).getTime()
          let timeFlag = ((nowTime - goodsDeatilResult.data.timeStamp) > config.timeStamp)
          if (timeFlag) { // 更新商品
            let updateResult = yield GoodsObj.crawGoodsData(hostname, goodsId, true)
            if (updateResult.code === 0) {
              self.updateSuccess++ // 更新成功
              execStatus = 1
            } else if (updateResult.code === -1) {
              self.updateFailed++ // 更新失败
              execStatus = 2
            }
          } else {
            execStatus = 3
            self.notUpdate++ // 未更新
          }
        } else { // 新增商品
          let addResult = yield GoodsObj.crawGoodsData(hostname, goodsId)
          if (addResult.code === 0) {
            self.goodsName = addResult.data.title || ''
            self.addSuccess++ // 新增成功
            execStatus = 4
          } else if (addResult.code === -1) {
            self.addFailed++ // 新增失败
            execStatus = 5
          }
        }
      }
      resolve({
        code: 0,
        data: execStatus
      })
    }).catch((err) => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

// 获取emit对象
ShopClass.prototype.getEmitMap = function () {
  return {
    shopName: this.shopName,
    totalPage: this.totalPage,
    currentPage: this.currentPage,
    pageSize: this.pageSize,
    totalResults: this.totalResults,
    goodsName: this.goodsName,
    timeStamp: this.timeStamp,
    updateSuccess: this.updateSuccess,
    updateFailed: this.updateFailed,
    notUpdate: this.notUpdate,
    addSuccess: this.addSuccess,
    addFailed: this.addFailed,
    execStatus: this.execStatus
  }
}

// 初始化
ShopClass.prototype.init = function () {
  this.isRuning = false
  this.shopName = '--'
  this.totalPage = 0
  this.currentPage = 1
  this.pageSize = 24
  this.totalResults = 0
  this.goodsName = '--'
  this.timeStamp = (new Date()).getTime()
  this.updateSuccess = 0
  this.updateFailed = 0
  this.notUpdate = 0
  this.addSuccess = 0
  this.addFailed = 0
  this.execStatus = null
}

// 爬取店铺所有商品数据
ShopClass.prototype.crawShopData = function (hostname, shopId, skuid) {
  let self = this
  Emitter.onEmitter() // 添加监听器
  this.isRuning = true
  return new Promise((resolve) => {
    co(function *() {
      let emitStartMap = self.getEmitMap()
      util.emitMsg('craw', {...emitStartMap, ...{flag: 'start'}})
      let shopMsgResult = yield _getShopGoodsMsg(hostname, shopId, skuid)
      if (shopMsgResult.code * 1 === 0 && shopMsgResult.data) {
        let target = shopMsgResult.data
        self.shopName = target.shop_title
        self.totalPage = target.total_page
        self.pageSize = target.page_size
        self.totalResults = target.total_results
      }
      yield util.delay(500)
      let goodsListResult = yield self._crawGoodsList(hostname, shopId, skuid)
      if (goodsListResult.code * 1 === 0 && goodsListResult.data) {
        let goodsList = goodsListResult.data || []
        for (let i = 0; i < goodsList.length; i++) {
          let time = util.getRandomTime(config.policy, config.detail.min)
          yield util.delay(time)
          let goodsId = goodsList[i].goodsId
          // 爬取商品数据
          let goodsResult = yield self._crawGoodsDetailData(hostname, goodsId)
          if (goodsResult.code * 1 === 0 && goodsResult.data) {
            self.timeStamp = (new Date()).getTime()
            self.currentPage = goodsList[i].currentPage
            self['execStatus'] = goodsResult.data
            // 发送socket消息
            let emitDetailMap = self.getEmitMap()
            util.emitMsg('craw', {...emitDetailMap, ...{flag: 'detail'}})
          }
        }
        let emitEndMap = self.getEmitMap()
        util.emitMsg('craw', {...emitEndMap, ...{flag: 'end'}})
        resolve({
          code: 0,
          data: 'success'
        })
      }
    }).catch((err) => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

module.exports = ShopClass
