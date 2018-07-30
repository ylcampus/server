/*
* iam模块
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const IamDao = require('../dao/iamDao')
const svgCaptcha = require('svg-captcha')
const setting = require('../../bin/setting')
const Util = require('../libs/util')
const menuAuth = require('../libs/dictionary/resource/menu')
// 用户登录
exports.userLogin = (req) => {
  return co(function *() {
    const account = req.body.account
    const password = req.body.pwd
    const lockGapTime = setting.lockGapTime // 账号锁定时间
    const maxErrTime = setting.maxErrTime // 最大错误次数
    if (!req.session.errTime || !req.session.lastTime) {
      req.session.errTime = 0 // 错误次数
      req.session.lastTime = 0 // 最后一次出错时间
    }

    // 账号锁定
    if (req.session.errTime > maxErrTime - 1) {
      let nowTime = ((new Date()).getTime())
      if (nowTime - lockGapTime < req.session.lastTime) {
        let err = new Error('账号与密码已连续错误5次，请10分钟后再试')
        err.code = 'iam.err400001'
        throw err
      } else {
        req.session.errTime = 0
        req.session.lastTime = 0
      }
    }

    // 获取用户信息
    let userMsg = yield IamDao.getUserMsg(req)
    // 检测账号是否存在
    if (!userMsg) {
      let err = new Error('账号不存在')
      err.code = 'iam.err400002'
      req.session.errTime++
      req.session.lastTime = (new Date()).getTime()
      throw err
    }

    // 账号密码校验
    let dbPwd = userMsg.pwd
    let dbAccount = userMsg.account
    if (password !== dbPwd || account !== dbAccount) {
      let err = new Error('账号或密码错误')
      err.code = 'iam.err400003'
      req.session.errTime++
      req.session.lastTime = (new Date()).getTime()
      throw err
    }

    // 账号密码校验通过后删除错误标识
    delete req.session.errTime
    delete req.session.lastTime

    // 判定用户是否是首次登陆
    let isOrigin = userMsg.origin
    if (isOrigin) {
      return {
        isFristLogin: true
      }
    } else {
      // 设置session
      req.session.user = {
        userId: userMsg.userId, // 用户Id
        tenantId: userMsg.tenantId, // 租户Id
        telephone: userMsg.telephone || null, // 手机号码
        origin: userMsg.origin, // 是否是初始密码
        account: userMsg.account, // 账户名
        tag: userMsg.tag // 标签
      }
      return {
        isFristLogin: false
      }
    }
  })
}

// 获取会话信息
exports.getSession = (req) => {
  return co(function *() {
    /*
    * 用户标签共分为五种类型：
    * root 超级管理员
    * tenant:租户；root:超级管理员；
    * user:普通用户
    * tag为root  或 tag为user但tenantId等于10000的情况：表明该用户为官方平台用户
    * tag为tenant 或 tag为user但tenantId不等于10000的情况：表明该用户为商家平台用户
    * */
    let userMsg = req.session.user
    if (userMsg) { // 表明已经登录
      const tag = req.session.user.tag
      if (tag === 'root' || (tag === 'user' && userMsg.tenantId === '10000')) {
        userMsg['auth'] = menuAuth['admin']
      } else if (tag === 'tenant' || (tag === 'user' && userMsg.tenantId !== '10000')) {
        userMsg['auth'] = menuAuth['seller']
      }
    }
    return userMsg || null
  })
}

// 登出
exports.loginOut = (req) => {
  return co(function *() {
    req.session.destroy()
    req.session = null
    return null
  })
}

// 获取验证码
exports.getCaptcha = (req) => {
  let codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 1, // 干扰线条的数量
    height: 50,
    width: 120
    // color: true,
    // background: '#f0f0f0'
  }
  let captcha = svgCaptcha.create(codeConfig)
  req.session.captcha = captcha.text
  return captcha
}

// 检测用户验证码及账号信息
exports.checkAccountMsg = (req) => {
  return co(function *() {
    // 检查用户账号是否存在
    let accountResult = yield IamDao.isUserAccountExist(req)
    if (!accountResult) {
      let err = new Error('账号不存在')
      err.code = 'iam.err400004'
      throw err
    }

    // 检测验证码是否错误
    let validCode = req.body.validCode.trim()
    let captcha = req.session.captcha.trim().toLowerCase()
    if (validCode !== captcha) {
      let err = new Error('验证码错误')
      err.code = 'iam.err400005'
      throw err
    }

    // 校验通过则根据账号获取用户基本信息
    let userBasicMsg = yield IamDao.getUserBasicMsg(req)
    if (!userBasicMsg.telephone) {
      let err = new Error('该账号未绑定手机号，无法找回密码，请联系客服人员解决')
      err.code = 'iam.err400006'
      throw err
    }

    req.session.account = userBasicMsg.account
    req.session.telephone = userBasicMsg.telephone
    // 把用户电话号码重点四位用****替换
    let tel = userBasicMsg.telephone
    return {
      telephone: tel
    }
  })
}

// 获取手机验证码 --之后需要进行修改--查询电话号码是否存在
exports.getTelephoneCode = (req) => {
  return co(function *() {
    // 之后需要增加对频繁获取验证码操作的限制
    if (!req.body.telephone) {
      let err = new Error('手机号码不存在')
      err.code = 'iam.err400003'
      throw err
    }
    // 下面是执行发送短信的逻辑
    let tCode = Util.getRandomNumber(6)
    req.session.validTelCode = tCode
    req.session.validTelTime = (new Date()).getTime()
    // 临时方案 返回一个六位随机数
    return tCode
  })
}

// 找回密码
exports.backPwd = (req) => {
  return co(function *() {
    let validCode = req.body.validCode.toString()
    let pwd = req.body.pwd
    let confirmPwd = req.body.confirmPwd

    if (!validCode || !pwd || !confirmPwd) {
      let err = new Error('参数错误')
      err.code = 'iam.err400009'
      throw err
    }
    if (!req.session.validTelCode) {
      let err = new Error('手机验证码不存在')
      err.code = 'iam.err400007'
      throw err
    }
    const nowTime = (new Date()).getTime()
    if (nowTime - req.session.validTime > setting.validTime) {
      let err = new Error('手机验证码已失效（半小时内有效）请重新获取')
      err.code = 'iam.err400008'
      throw err
    }
    if (validCode !== req.session.validTelCode) {
      let err = new Error('验证码错误')
      err.code = 'iam.err400010'
      throw err
    }
    // 两次密码输入不一致
    if (pwd !== confirmPwd) {
      let err = new Error('两次密码输入不一致')
      err.code = 'iam.err400012'
      throw err
    }
    // 找回密码
    return yield IamDao.backPwd(req)
  })
}

// 修改密码并绑定手机号
exports.modifyPwdAndBindTelephone = (req) => {
  return co(function *() {
    let newPassword = req.body.newPassword
    let originalPassword = req.body.originalPassword
    let telephone = req.body.telephone
    let account = req.body.account
    let validCode = req.body.validCode.toString()
    // 参数错误
    if (!newPassword || !originalPassword || !telephone || !account || !validCode) {
      let err = new Error('参数错误')
      err.code = 'iam.err400009'
      throw err
    }
    // 验证码不存在
    if (!req.session.validTelCode) {
      let err = new Error('手机验证码不存在')
      err.code = 'iam.err400007'
      throw err
    }
    // 验证码失效
    const nowTime = (new Date()).getTime()
    if (nowTime - req.session.validTelTime > setting.validTime) {
      let err = new Error('手机验证码已失效（半小时内有效）请重新获取')
      err.code = 'iam.err400008'
      throw err
    }
    // 验证码错误
    if (validCode !== req.session.validTelCode) {
      let err = new Error('验证码错误')
      err.code = 'iam.err400010'
      throw err
    }
    // 新密码不能与原始密码相同
    if (newPassword === originalPassword) {
      let err = new Error('新密码不能与原始密码相同')
      err.code = 'iam.err400011'
      throw err
    }
    // 检查电话号码是否存在
    let telResult = yield IamDao.isTelephoneExist(req)
    if (telResult) {
      let err = new Error('手机号码已被使用')
      err.code = 'iam.err400012'
      throw err
    }

    // 获取用户信息
    let userMsg = yield IamDao.getUserBasicMsg(req)
    if (!userMsg) {
      let err = new Error('用户名不存在')
      err.code = 'iam.err400013'
      throw err
    }
    // 权限判定
    let isOrigin = Boolean(userMsg.origin)
    if (!isOrigin) {
      let err = new Error('无权限')
      err.code = 'iam.err400014'
      throw err
    }

    // 原始密码错误
    let pwd = userMsg.pwd
    if (pwd !== originalPassword) {
      let err = new Error('原始密码错误')
      err.code = 'iam.err400015'
      throw err
    }
    // 修改密码并绑定手机号
    return yield IamDao.modifyPwdAndBindTelephone(req)
  })
}

// 更换手机号
exports.changeTelephone = (req) => {
  return co(function *() {
    let validCode = req.body.validCode.toString()
    let telephone = req.body.telephone
    // 参数检查
    if (!validCode || !telephone) {
      let err = new Error('参数错误')
      err.code = 'iam.err400009'
      throw err
    }
    // 检查验证码是否存在
    if (!req.session.validTelCode) {
      let err = new Error('手机验证码不存在')
      err.code = 'iam.err400007'
      throw err
    }
    // 检查验证码正确性
    if (validCode !== req.session.validTelCode) {
      let err = new Error('验证码错误')
      err.code = 'iam.err400010'
      throw err
    }
    // 检查验证码是否失效
    const nowTime = (new Date()).getTime()
    if (nowTime - req.session.validTelTime > setting.validTime) {
      let err = new Error('手机验证码已失效（半小时内有效）请重新获取')
      err.code = 'iam.err400008'
      throw err
    }
    // 检查手机号是否存在
    let result = yield IamDao.isTelephoneExist(req)
    if (result) {
      let err = new Error('手机号已被使用')
      err.code = 'iam.err400011'
      throw err
    }
    // 更换手机号
    return yield IamDao.updateTelephone(req)
  })
}

// 修改密码
exports.modifyPwd = (req) => {
  return co(function *() {
    let oldPassword = req.body.oldPassword
    let newPassword = req.body.newPassword
    let confirmPwd = req.body.confirmPwd
    // 检查参数是否正确
    if (!oldPassword || !newPassword || !confirmPwd) {
      let err = new Error('参数错误')
      err.code = 'iam.err400009'
      throw err
    }
    // 两次密码输入不一致
    if (newPassword !== confirmPwd) {
      let err = new Error('两次密码输入不一致')
      err.code = 'iam.err400012'
      throw err
    }
    // 检查老密码是否正确
    let result = IamDao.isValidOldPwd(req)
    if (!result) {
      let err = new Error('密码错误')
      err.code = 'iam.err400013'
      throw err
    }
    // 执行更新密码操作
    return yield IamDao.modifyPwd(req)
  })
}

// 获取个人基本信息
exports.getBasicMsg = (req) => {
  return co(function *() {
    let result = yield IamDao.getBasicMsg(req)
    delete result.pwd
    return result
  })
}

// 编辑个人基本信息
exports.editBasicMsg = (req) => {
  return co(function *() {
    // 获取角色详情
    let uresult = yield IamDao.getBasicMsg(req)
    if (uresult) {
      // 检查电子邮箱是否存在
      if (req.body.email && req.body.email !== uresult.email) {
        let emailResult = yield IamDao.isEmailExist(req)
        if (emailResult) {
          let emailErr = new Error('电子邮箱已被使用')
          emailErr.code = 'user.err400003'
          throw emailErr
        }
      }
    }
    return yield IamDao.editBasicMsg(req)
  })
}

// 会员注册
exports.register = (req) => {
  return co(function *() {
    if (!req.body.account) {
      let err = new Error('参数错误')
      err.code = 'user.err400001'
      throw err
    }
    // 检查会员账号是否存在
    let accountResult = yield IamDao.isMemberAccountExist(req)
    if (accountResult) {
      let accountErr = new Error('账号已经存在')
      accountErr.code = 'iam.err400002'
      throw accountErr
    }
    // 会员注册
    return yield IamDao.register(req)
  })
}
