/*
* 菜单权限配置
* @author dongjiguo2008123@126.com
* api接口整体分两大类 需要登录接口与不需要登录接口
* 对于需要登录接口情形
* 数组中的数字代表权限 其中 1代表具有权限 0代表不具有权限
* arr[0] 官方平台权限（root OR user） 包括官方平台 超级管理员与超级管理员所创建的普通用户
* arr[1] 商家平台权限（tenant OR user）包括商家平台 管理员与该管理员所创建的普通用户
* arr[2] 优乐商城权限（member）代表优乐会员
* arr[3] 代表访客权限（visit）
*
* @date 2018/06
* */
module.exports = {
  admin: [ // 官方管理平台
    {
      code: '100',
      name: '概览',
      enName: 'Overview',
      href: '/overview',
      icon: 'el-icon-view',
      subMenu: []
    },
    {
      code: '200',
      name: '入驻店铺',
      enName: 'Enter Shop',
      href: '/shop',
      icon: 'el-icon-sort',
      subMenu: []
    },
    {
      code: '300',
      name: '商品管理',
      enName: 'Goods Management',
      href: '/goods',
      icon: 'el-icon-sold-out',
      subMenu: []
    },
    {
      code: '400',
      name: '订单管理',
      enName: 'Order Management',
      href: '/order',
      icon: 'el-icon-tickets',
      subMenu: []
    },
    {
      code: '500',
      name: '会员管理',
      enName: 'Member Management',
      href: '/member',
      icon: 'el-icon-news',
      subMenu: []
    },
    {
      code: '600',
      name: '打折券管理',
      enName: 'Discount Management',
      href: '/discount',
      icon: 'el-icon-share',
      subMenu: []
    },
    {
      code: '700',
      name: '系统管理',
      enName: 'Systen Management',
      href: '/user',
      icon: 'el-icon-setting',
      disabled: true,
      subMenu: [
        {
          code: '7001',
          name: '用户管理',
          enName: 'User Management',
          href: '/user',
          disabled: true,
          subMenu: []
        },
        {
          code: '7002',
          name: '角色管理',
          enName: 'Role Management',
          href: '/role',
          disabled: true,
          subMenu: []
        },
        {
          code: '7003',
          name: '任务管理',
          enName: 'Task Management',
          href: '/task',
          disabled: true,
          subMenu: []
        },
        {
          code: '7004',
          name: '文件管理',
          enName: 'File Management',
          href: '/file',
          disabled: true,
          subMenu: []
        }
      ]
    }
  ],
  seller: [ // 商家管理平台
    {
      code: '100',
      name: '概览',
      enName: 'Overview',
      href: '/overview',
      icon: 'el-icon-view',
      subMenu: []
    }
  ]
}
