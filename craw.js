// 可以从这个地方入手开始了
const co = require('co')
let Craw = require('./root/libs/craw')

let hostname = 'mizuno.m.tmall.com'
let shopId = '62193774'
let skuid = '451024527'
// _getOption
// 考虑一下到底应该怎样处理 ？
co(function *() {
  let result = yield Craw.ShopObj.crawShopData(hostname, shopId, skuid)
  if (result.code * 1 === 0) {
    console.log('爬取店铺商品成功')
    console.log(result.data)
  }
}).catch(err => {
  console.log('发生了错误2')
})

// 时间 2018-02-09 08:00:00 店铺 [455/6]商品 状态 ->表格

// 接下来就要处理有关wensocket相关的问题了


