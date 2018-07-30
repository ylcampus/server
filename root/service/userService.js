/*
* 用户管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const UserDao = require('../dao/userDao')

// 检查超级管理员账号是否存在
exports.isSuperAdminAccountExist = (req) => {
  return UserDao.isSuperAdminAccountExist()
}

// 创建一个超级管理员账号
exports.createSuperAdminAccount = () => {
  return UserDao.createSuperAdminAccount()
}

// 添加用户
exports.addUser = (req) => {
  return co(function *() {
    if (!req.body.roleId || !req.body.account) {
      let err = new Error('参数错误')
      err.code = 'user.err400001'
      throw err
    }
    // 检查用户账号是否存在
    let accountResult = yield UserDao.isUseraccountExist(req)
    if (accountResult) {
      let accountErr = new Error('用户账号已经存在')
      accountErr.code = 'user.err400002'
      throw accountErr
    }
    return yield UserDao.addUser(req)
  })
}

// 获取用户详情
exports.userDetail = (req) => {
  return co(function *() {
    let userId = req.params.userId
    let result = yield UserDao.userDetail(userId)
    delete result.pwd
    return result
  })
}

// 编辑用户
exports.editUser = (req) => {
  return co(function *() {
    // 获取角色详情
    let uresult = yield UserDao.userDetail(req.session.user.userId)
    if (uresult) {
      // 检查电子邮箱是否存在
      if (req.body.email && req.body.email !== uresult.email) {
        let emailResult = yield UserDao.isUserEmailExist(req)
        if (emailResult) {
          let emailErr = new Error('电子邮箱已被使用')
          emailErr.code = 'user.err400003'
          throw emailErr
        }
      }
    }
    return yield UserDao.editUser(req)
  })
}

// 重置用户密码
exports.resetUserPassword = (req) => {
  return co(function *() {
    let userId = req.params.userId
    if (!userId) {
      let err = new Error('参数错误')
      err.code = 'user.err400003'
      throw err
    }
    return yield UserDao.resetUserPassword(req)
  })
}

// 删除用户
exports.deleteUser = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    return yield UserDao.deleteUser(ids)
  })
}

// 获取用户列表
exports.userList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'user.err400004'
      throw err
    }
    query.tenantId = req.session.user.userId
    let result = yield UserDao.userList(query)
    let arr = []
    for (let i = 0; i < result.length; i++) {
      let target = result[i]
      // 根据角色Id获取角色名称
      if (target.userId !== req.session.user.userId) {
        let roleDetail = yield UserDao.getRoleDetail(target.roleId)
        let map = {
          account: target.account,
          sex: target.sex,
          create_at: target.create_at,
          desc: target.desc,
          name: target.name,
          origin: target.origin,
          roleId: target.roleId,
          tag: target.tag,
          telephone: target.telephone,
          update_at: target.update_at,
          userId: target.userId
        }
        map.roleName = roleDetail ? roleDetail.name : '---'
        arr.push(map)
      }
    }
    let total = yield UserDao.userTotal(query)
    let backMap = {
      rows: arr,
      total: total
    }
    return backMap
  })
}
