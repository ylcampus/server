// 爬取商品详情数据 2018-07
'use strict'
const request = require('request')
const j = request.jar()
const co = require('co')
const iconv = require('iconv-lite')
const fs = require('fs')
const path = require('path')
const util = require('../util')
const config = require('../config/config')
const cheerio = require('cheerio')
const crawService = require('../../../service/crawService')
// 构造函数
let GoodsClass = function () {}

// 获取spm
let _getSpm = () => {
  let arr = []
  let arr2 = []
  arr.push(util.generateString(5))
  arr.push('1-b-s')
  arr2.push('w')
  arr2.push(util.generateMixedNumber(4))
  arr2.push('-')
  arr2.push(1)
  arr2.push(util.generateMixedNumber(10))
  let wStr = arr2.join('')
  arr.push(wStr)
  arr.push(util.generateMixedNumber(2))
  arr.push(util.generateMixedString(14))
  return arr.join('.')
}

//  获取ur与search
let _getUrlAndSearch = (goodsId) => {
  let uri = config.detail.uri
  let query = uri.query
  query.id = goodsId
  query.spm = _getSpm() // 获取Spm
  // 组装查询字符串
  let arr = []
  for (let idx in query) {
    let qStr = idx + '=' + query[idx]
    arr.push(qStr)
  }
  let serch = arr.join('&').trim()
  // 拼接url
  let uarr = []
  uarr.push(uri.protocol)
  uarr.push('://')
  uarr.push(uri.pathname)
  return {
    url: (uarr.join('') + '?' + serch).trim(),
    serch: serch
  }
}

// 获取referer
let _getReferer = (hostname) => {
  let uri = config.detail.uri
  let query = uri.referer
  query.spm = _getSpm()
  // 组装查询字符串
  let arr = []
  for (let idx in query) {
    let qStr = idx + '=' + query[idx]
    arr.push(qStr)
  }
  let serch = arr.join('&').trim()
  // 获取hostname
  let hArr = hostname.split('.')
  hArr.splice(1, 1)
  let freshHostName = hArr.join('.')
  // 拼接url
  let uarr = []
  uarr.push(uri.protocol)
  uarr.push('://')
  uarr.push(freshHostName)
  uarr.push('/')
  return (uarr.join('') + '?' + serch).trim()
}

// 获取option请求参数
let _getOption = (hostname, goodsId) => {
  let options = {
    url: null,
    headers: config.detail.headers,
    jar: j,
    gzip: true,
    encoding: null
  }
  let urlSearch = _getUrlAndSearch(goodsId)
  options.url = urlSearch.url
  options.headers.path = ('/item.htm?' + urlSearch.serch).trim()
  options.headers.referer = _getReferer(hostname)
  return options
}

// 延时函数
let _delay = (gap) => {
  let time = 100 + Math.random() * gap
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// 获取商品描述数据
let _getGoodsDescPic = (url) => {
  return new Promise((resolve) => {
    let options = {
      url: 'http:' + url,
      headers: config.detail.descHeaders,
      jar: j
    }
    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let picArr = []
        let $ = cheerio.load(body)
        $('p').find('img').each((idx, dom) => {
          picArr.push($(dom).attr('src'))
        })
        resolve({
          code: 0,
          data: picArr
        })
      } else {
        resolve({
          code: -1,
          message: error.message
        })
      }
    })
  })
}

// 获取json对象
let _getJsonObj = (originJson) => {
  let goodsMap = {
    goodsId: null, // 商品id
    title: null, // 标题
    price: 0, // 价格
    shopId: null, // 店铺Id
    pics: {}, // 颜色图片
    descPics: [], // 描述图片
    skuList: [] // 颜色 尺码 skuid与库存信息
  }
  goodsMap.goodsId = originJson.itemDO.itemId
  goodsMap.title = originJson.itemDO.title
  goodsMap.price = originJson.detail.defaultItemPrice
  goodsMap.shopId = originJson.rstShopId
  // 获取属性图片
  let propertyPics = originJson.propertyPics
  if (propertyPics.default) {
    delete propertyPics.default
  }
  // 数据模型格式转换
  for (let idx in propertyPics) {
    let cImg = propertyPics[idx][0]
    let mapKey = util.getPropertyIdFromStr(idx, '1627207')
    let map = {}
    map[mapKey] = cImg
    goodsMap.pics = {...goodsMap.pics, ...map}
  }
  // 获取商品描述信息
  return new Promise((resolve) => {
    co(function *() {
      let descUrl = originJson.api.descUrl
      // 随机延时100ms - 500ms
      yield _delay(500)
      let descResult = yield _getGoodsDescPic(descUrl)
      if (descResult.code * 1 === 0 && descResult.data) {
        goodsMap.descPics = descResult.data
      }
      // 获取商品颜色，尺码，skuid及其库存信息
      let skuList = originJson.valItemInfo.skuList
      let skuMap = originJson.valItemInfo.skuMap
      for (let row of skuList) {
        let cId = util.getPropertyIdFromStr(row.pvs, '1627207')
        let map = {}
        map.skuId = row.skuId
        map.names = row.names
        map.cId = cId
        let target = {}
        for (let idxmap in skuMap) {
          if (skuMap[idxmap].skuId === map.skuId) {
            target = skuMap[idxmap]
            break
          }
        }
        map.price = target.price || 0
        map.stock = target.stock || 0
        goodsMap.skuList.push(map)
      }
      resolve({
        code: 0,
        data: goodsMap
      })
    }).catch(err => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

// 从网页中爬取商品数据
let _crawDataFromHtml = (hostname, goodsId) => {
  return new Promise((resolve) => {
    let freshOptions = _getOption(hostname, goodsId)
    request.get(freshOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        co(function *() {
          let htmlstr = iconv.decode(body, 'GBK')
          let startChar = htmlstr.indexOf('{"valItemInfo":')
          let endChar = htmlstr.indexOf('"getProgressiveInfoApi":')
          let newStr = htmlstr.substring(startChar, endChar - 1)
          let realStr = newStr + '}'
          let jsonObj = JSON.parse(realStr)
          let jsonResult = yield _getJsonObj(jsonObj)
          if (jsonResult.code * 1 === 0) {
            resolve({
              code: 0,
              data: jsonResult.data
            })
          }
        }).catch((err) => {
          resolve({
            code: -1,
            message: err.message
          })
        })
      } else {
        resolve({
          code: -1,
          message: error.message
        })
      }
    })
  })
}

// 保存单张图片
let _savePic = (pic) => {
  return new Promise((resolve) => {
    let protocol = 'http'
    let options = {
      url: null,
      headers: config.detail.picHeaders,
      encoding: null
    }
    options.url = (pic.indexOf(protocol) === -1) ? (protocol + ':' + pic) : pic
    let filename = pic.substring(pic.lastIndexOf('/') + 1)
    let savePath = path.join('dist/pics', filename)
    request.get(options).on('response', (res) => {
      if (res.statusCode === 200) {
        resolve({
          code: 0,
          data: '/pics/' + filename
        })
      } else {
        resolve({
          code: -1,
          message: '图片下载失败'
        })
      }
    }).pipe(fs.createWriteStream(savePath))
  })
}

// 保存商品图片
let _savePics = (pics) => {
  return new Promise((resolve) => {
    co(function *() {
      for (let index in pics) {
        yield _delay(config.detail.picDelayTime)
        let result = yield _savePic(pics[index])
        if (result.code * 1 === 0 && result.data) {
          pics[index] = result.data
        }
      }
      resolve({
        code: 0,
        data: pics
      })
    }).catch(err => {
      resolve({
        code: -1,
        data: err.message
      })
    })
  })
}

// 保存描述图片
let _saveDescPics = (pics) => {
  return new Promise((resolve) => {
    co(function *() {
      let backArr = []
      for (let pic of pics) {
        yield _delay(config.detail.picDelayTime)
        let result = yield _savePic(pic)
        if (result.code * 1 === 0 && result.data) {
          backArr.push(result.data)
        }
      }
      resolve({
        code: 0,
        data: backArr
      })
    }).catch(err => {
      resolve({
        code: -1,
        data: err.message
      })
    })
  })
}

// 爬取商品数据
GoodsClass.prototype.crawGoodsData = function (hostname, goodsId, flag) {
  return new Promise((resolve) => {
    co(function *() {
      let result = yield _crawDataFromHtml(hostname, goodsId)
      if (result.code * 1 === 0) {
        let saveDoc = result.data
        let pics = saveDoc.pics
        let descPics = saveDoc.descPics
        // 保存商品图片
        let picsResult = yield _savePics(pics)
        if (picsResult.code * 1 === 0 && picsResult.data) {
          saveDoc.pics = picsResult.data
        }
        // 保存描述图片
        let descPicsResult = yield _saveDescPics(descPics)
        if (descPicsResult.code * 1 === 0 && descPicsResult.data) {
          saveDoc.descPics = descPicsResult.data
        }
        let saveRes = null
        if (flag) { // 更新商品
          saveRes = yield crawService.updateGoodsDocFromDB(saveDoc)
        } else { // 新增商品
          saveRes = yield crawService.saveGoodsDocToDB(saveDoc)
        }
        if (saveRes.code * 1 === 0 && saveRes.data) {
          resolve({
            code: 0,
            data: saveDoc
          })
        }
      }
    }).catch((err) => {
      resolve({
        code: -1,
        message: err.message
      })
    })
  })
}

module.exports = GoodsClass
