console.log('here')
const uuid = require('uuid')
// 考虑下一步的工作 资源表设计
let resource = {
  id: '24fa4366-1ce0-4b36-a204-1500799dfb3d', // 资源id
  type: 'api', // 资源类型 page or api
  path: 'api/goods/goodsList', // 资源路径
  name: '商品列表', // 名称
  module: '商品管理',
  belongTo: '', // 资源所属 官方管理平台 or 商家管理平台
  tenantId: '10000', // 租户Id-即店铺 -官方管理平台也是特殊租户
  createAt: '', // 创建时间
  updateAt: '' // 最近更新时间
}
// ?这样的话还有没有必要做有关资源的接口
console.log(uuid.v4())
// 关于资源
let res = [ //资源列表-api
  'api/iam/login',
  'api/goods/goodsList',
  'api/shop/addShop',
  'api/shop/shopDetail',
  'api/shop/shopList',
  'api/shop/editShop',
  'api/user/addUser',
  'api/user/deleteUser',
  'api/user/editUser',
  'api/user/userList',
  'api/task/addTask',
  'api/task/editTask',
  'api/task/taskDetail',
  'api/role/addRole',
  'api/role/deleteRole',
  'api/role/editRole',
  'api/role/roleDetail',
  'api/role/roleList',
  'api/resource/addResource',
  'api/resource/deleteResource',
  'api/resource/resourceList',
  'api/order/addOrder',
  'api/order/deleteOrder',
  'api/order/orderDetail',
  'api/order/orderList',
  'api/discount/rushDiscount',
  'api/discount/discountList',
  'api/area/addArea',
  'api/area/deleteArea',
  'api/area/editArea',
  'api/area/areaTree',
  'api/total/shopTotal',
]
// 用户-角色 一对一
// 角色-资源 多对多
// 资源列表--页面
// 所有请求都用post方法
// 官方管理平台不涉及api权限 ？

let resourceList = [
  {
    id: '24fa4366-1ce0-4b36-a204-1500799dfb3d',
    type: 'api',
    path: 'api/iam/login',
    name: '商品列表',
    module: '商品管理',
    belongTo: '',
    tenantId: '10000',
    createAt: '',
    updateAt: ''
  }
]
// 用该做成一个excel表格
let pageList = [
  'page/admin/overview', // 概览页面-
  'page/seller/overview', // 概览页面-
  'page/goodsList', // 商品列表
  'page/addShop',
  'page/editShop',
  'page/shopList',
  'page/userDetail',
  'page/taskList',
  'page/addTask',
  'page/admin/role',
  'page/seller/role',
  'page/resource',
  'page/area',
  'page/admin/total',
  'page/seller/total'
]
// 或者
let pageList = [
  'page/overview', // 概览
  'page/goods', // 商品管理
  'page/shop', // 店铺管理
  'page/task', // 定时任务
  'page/user', // 用户管理
  'page/role', // 角色管理
  'page/resource', // 资源管理
  'page/area', // 区域管理
  'page/discount', // 打折券管理
  'page/file', // 文件管理
  'page/order', // 订单管理
  'page/basic', // 用户基本信息
]
-----共计12部分-----
// 具体细节再考虑
按模块菜单设计
#侧边栏
  #概览-1
  #商品管理-1
  #店铺管理-3
  #系统管理
    --用户管理
    --角色管理
    --资源管理
    --区域管理
  #定时任务
  #打折券管理
  #文件管理
  #订单管理
  @共计8部分
#头部
  #用户基本信息


















