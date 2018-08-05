// 系统配置
module.exports = {
  host: '192.168.1.4', // 主机名
  port: 5566, // 端口
  cookieSecret: 'ulexy', // cookie秘钥
  maxAge: 60 * 60 * 1000, // 过期时间1小时
  bodyLimit: '50mb', // ajax请求body最多为50M
  lockGapTime: 10 * 60 * 1000, // 账号锁定时间
  maxErrTime: 5, // 登录最大错误次数
  rootTenantId: 10000, // 根用户的租户Id
  rootStatisDir: 'static',
  validTime: 30 * 60 * 1000, // 验证码失效时间-半小时
  defaultPwd: 'ule@1234', // 用户初始密码
  crawPwd: 'craw@123', // 爬虫校验密码
  db: { // mongodb相关设置
    domain: 'mongodb://localhost:27017/ule',
    iam: 'mongodb://localhost:27017/iam'
  }
}
