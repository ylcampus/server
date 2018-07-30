/*
* 过滤器
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* @desc 两个问题没有解决
* 1：单点登录
* 2：同一账号只能在一个地方登录
* */
'use strict'
const co = require('co')
const util = require('../util')
const apiAuth = require('../dictionary/resource/api') // api权限字典
const totalSerice = require('../../service/totalService')
module.exports = (req, res, next) => {
  co(function* () {
    const authKey = util.getAuthKey(req.originalUrl)
    // 访问数据采集
    const totalApiList = apiAuth['total']
    if (totalApiList.indexOf(authKey) > -1) {
      let tenantId = '10000'
      if (authKey === 'apiShopShopDetail') { // 店铺详情
        tenantId = req.originalUrl.substr(1).split('/')[3]
      } else if (authKey === 'apiGoodsGoodsDetail') { // 商品详情
        tenantId = req.originalUrl.substr(1).split('/')[4]
      }
      totalSerice.addVisitData(tenantId)
    }
    const visitAuthList = apiAuth['visit']
    // 如果是访客接口则直接过
    if (visitAuthList.indexOf(authKey) > -1) {
      return next()
    }
    // 登录校验
    if (!req.session.user) {
      let err = new Error('请登录')
      err.status = 401
      req.session.destroy()
      return next(err)
    }

    // 检查接口是否注册
    let tag = req.session.user.tag || 'visit'
    let authArr = apiAuth['apiMap'][authKey]
    if (!authArr) {
      let err = new Error('接口未注册')
      err.status = 500
      return next(err)
    }

    // 权限校验
    let realTag = null
    if (tag === 'user') {
      if (req.session.user.tenantId === '10000') {
        realTag = 'root'
      } else {
        realTag = 'tenant'
      }
    } else {
      realTag = tag
    }
    const authAxis = util.getAuthAxis(realTag)
    let auth = authArr[authAxis]
    if (!auth) {
      let err = new Error('无权限，请联系管理员')
      err.status = 403
      // req.session.destroy()
      next(err)
    } else {
      req.session.timeStamp = (new Date()).getTime()
      next()
    }
  })
}
