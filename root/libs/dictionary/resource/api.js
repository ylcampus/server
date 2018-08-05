/*
* api权限配置
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
  visit: [ // 不需要登录验证的接口
    'apiIamUserLogin', // 用户登录
    'apiIamLoginOut', // 登出
    'apiIamGetCaptcha', // 获取图形验证码
    'apiIamGetSession', // 获取用户会话信息
    'apiIamCheckAccountMsg', // 检查账号信息-查看账号是否存在
    'apiIamGetTelephoneCode', // 获取手机验证码
    'apiIamBackPwd', // 修改密码 适用于忘记密码情形
    'apiIamModifyPwdAndBindTelephone', // 修改密码并绑定手机号
    'apiIamRegister', // 会员注册
    'apiIamMemberLogin' // 会员登录
  ],
  total: [ // 需要采集访问数据的接口
    'apiShopShopList',
    'apiShopShopDetail',
    'apiGoodsGoodsDetail'
  ],
  apiMap: { // 需要登录验证的接口
    // 用户管理
    apiUserAddUser: [1, 0, 0, 0], // 添加用户
    apiUserDeleteUser: [1, 0, 0, 0], // 删除用户
    apiUserEditUser: [1, 0, 0, 0], // 编辑用户
    apiUserUserDetail: [1, 0, 0, 0], // 获取用户详情
    apiUserUserList: [1, 0, 0, 0], // 获取用户列表
    apiUserResetUserPassword: [1, 0, 0, 0], // 重置用户密码
    // 定时任务
    apiTaskAddTask: [1, 0, 0, 0], // 添加定时任务
    apiTaskEditTask: [1, 0, 0, 0], // 编辑定时任务
    apiTaskTaskDetail: [1, 0, 0, 0], // 获取定时任务详情
    apiTaskTaskList: [1, 0, 0, 0], // 获取定时任务列表
    // 店铺管理
    apiShopAddShop: [1, 0, 0, 0], // 创建店铺
    apiShopDeleteShop: [1, 0, 0, 0], // 删除店铺
    apiShopEditShop: [1, 0, 0, 0], // 编辑店铺
    apiShopShopDetail: [1, 0, 0, 0], // 获取店铺详情
    apiShopShopList: [1, 0, 0, 0], // 获取店铺列表
    apiShopCrawData: [1, 0, 0, 0], // 爬取商品
    apiShopGetCrawLogData: [1, 0, 0, 0], // 获取执行日志数据
    // 角色管理
    apiRoleAddRole: [1, 0, 0, 0], // 添加角色
    apiRoleDeleteRole: [1, 0, 0, 0], // 删除角色
    apiRoleEditRole: [1, 0, 0, 0], // 编辑角色
    apiRoleRoleDetail: [1, 0, 0, 0], // 获取角色详情
    apiRoleRoleList: [1, 0, 0, 0], // 获取角色列表
    // IAM
    apiIamChangeTelephone: [1, 0, 0, 0], // 修改手机号
    apiIamModifyPwd: [1, 0, 0, 0], // 修改密码
    apiIamGetBasicMsg: [1, 0, 0, 0], // 获取个人基本信息
    apiIamEditBasicMsg: [1, 0, 0, 0], // 编辑个人基本信息
    // 文件管理
    apiFileReadDir: [1, 0, 0, 0], // 读取目录
    apiFileRmDir: [1, 0, 0, 0], // 删除目录
    apiFileDownload: [1, 0, 0, 0], // 文件下载
    apiFilePreview: [1, 0, 0, 0], // 文件预览
    // 订单管理
    apiOrderSubmitOrder: [1, 0, 1, 0], // 提交订单
    apiOrderOrderDetail: [1, 0, 0, 0], // 订单详情
    apiOrderOrderList: [1, 0, 0, 0], // 订单列表
    // 会员管理
    apiMemberDeleteMember: [1, 0, 1, 0], // 删除会员
    apiMemberMemberDetail: [1, 0, 1, 0], // 会员详情
    apiMemberMemberList: [1, 0, 1, 0], // 会员列表
    apiMemberFreeze: [1, 0, 0, 0], // 冻结、解冻会员账号
    // 区域管理
    apiAreaAreaTree: [1, 0, 0, 0], // 区域树
    // 打折券管理
    apiDiscountAddDiscount: [1, 0, 0, 0], // 添加打折券
    apiDiscountDiscountDetail: [1, 0, 0, 0], // 打折券详情
    apiDiscountDiscountList: [1, 0, 0, 0], // 打折券列表
    // 商品管理
    apiGoodsAddGoods: [1, 0, 0, 0], // 添加商品
    apiGoodsUpdateGoods: [1, 0, 0, 0], // 更新商品数据
    apiGoodsGoodsUpOrDown: [1, 0, 0, 0], // 商品上下架
    apiGoodsGoodsDetail: [1, 0, 0, 0], // 商品详情
    apiGoodsGoodsList: [1, 0, 0, 0], // 商品列表
    // 数据统计
    apiTotalGetLineChartData: [1, 0, 0, 0], // 获取访问数据
    apiTotalGetOrderChartData: [1, 0, 0, 0], // 获取订单统计数据
    apiTotalGetGoodsChartData: [1, 0, 0, 0], // 获取商品统计数据
    apiTotalGetMemberChartData: [1, 0, 0, 0], // 获取会员统计数据
    apiTotalGetDiscountChartData: [1, 0, 0, 0] // 获取打折券统计数据
  }
}
