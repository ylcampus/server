/*
* 角色管理
* @author dongjiguo2008123@126.com
*
* @date 2018/05
* */
'use strict'
const co = require('co')
const RoleDao = require('../dao/roleDao')
const Resource = require('../libs/dictionary/resource/menu')
// 添加角色
exports.addRole = (req) => {
  return co(function *() {
    // 检查角色名称是否存在
    let nameResult = yield RoleDao.isRoleNameExist(req)
    if (nameResult) {
      let nameErr = new Error('角色名称已存在')
      nameErr.code = 'role.err400001'
      throw nameErr
    }
    // 添加角色
    return yield RoleDao.addRole(req)
  })
}

// 编辑角色
exports.editRole = (req) => {
  return co(function *() {
    let roleId = req.body.roleId
    if (!roleId) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    // 获取角色详情
    let result = yield RoleDao.roleDetail(roleId)
    if (result) {
      // 检查角色名称是否存在
      if (req.body.name && req.body.name !== result.name) {
        let nameResult = yield RoleDao.isRoleNameExist(req)
        if (nameResult) {
          let err = new Error('角色名称已存在')
          err.code = 'role.err400002'
          throw err
        }
      }
    }
    return yield RoleDao.editRole(req)
  })
}

// 删除角色
exports.deleteRole = (req) => {
  return co(function *() {
    let ids = req.body.ids
    if (ids.length === 0) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    return yield RoleDao.deleteRole(ids)
  })
}

// 获取角色详情
exports.roleDetail = (req) => {
  return co(function *() {
    let roleId = req.params.roleId
    if (!roleId) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    return yield RoleDao.roleDetail(roleId)
  })
}

// 获取角色列表
exports.roleList = (req) => {
  return co(function *() {
    let query = req.query
    // 参数校验
    let pageSize = parseInt(query.pageSize, 10)
    let pageNo = parseInt(query.pageNo, 10)
    if (!pageNo || !pageSize) {
      let err = new Error('参数错误')
      err.code = 'role.err400004'
      throw err
    }
    let result = yield RoleDao.roleList(query)
    let resultArr = []
    let tag = req.session.user.tag
    let tagTxt = null
    if (tag === 'root' || (tag === 'user' && req.session.user.userId === '10000')) {
      tagTxt = 'admin'
    } else if (tag === 'tenant' || (tag === 'user' && req.session.user.userId !== '10000')) {
      tagTxt = 'seller'
    }
    for (let i = 0; i < result.length; i++) {
      let auth = result[i].auth.split(',')
      let authTxt = []
      for (let j = 0; j < auth.length; j++) {
        let authArr = Resource[tagTxt]
        for (let k = 0; k < authArr.length; k++) {
          if (authArr[k].code === auth[j]) {
            authTxt.push({
              name: authArr[k].name,
              tag: 'main'
            })
          }
          if (authArr[k].subMenu.length) {
            for (let l = 0; l < authArr[k].subMenu.length; l++) {
              if (authArr[k].subMenu[l].code === auth[j]) {
                authTxt.push({
                  name: authArr[k].subMenu[l].name,
                  tag: 'sub'
                })
              }
            }
          }
        }
      }
      let map = {
        auth: result[i].auth,
        create_at: result[i].create_at,
        desc: result[i].desc,
        name: result[i].name,
        roleId: result[i].roleId,
        tenantId: result[i].tenantId,
        update_at: result[i].update_at,
        authArr: authTxt
      }
      resultArr.push(map)
    }
    // 还要增加模糊搜索
    let total = yield RoleDao.roleTotal(query)
    let backMap = {
      rows: resultArr,
      total: total
    }
    return backMap
  })
}
