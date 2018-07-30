app.use(config.dev.proxy.prefix, (req, res) => {
  const url = config.dev.proxy.domian + req.originalUrl
  console.log('代理到:' + url)
  req.pipe(request(url).on('error', (err) => {
    console.log('代理错误！' + err)
  })).pipe(res)
})
// craw.crawGoodsDetailMsg().then((data) => {
//   console.log(data)
// })
//
// let shops = [{
//   hostname: 'mizuno.m.tmall.com',
//   shopId: '62193774',
//   suid: '451024527'
// }, {
//   hostname: 'asics.m.tmall.com',
//   shopId: '64474411',
//   suid: '661559176'
// }]
//
// craw.crawAllData(shops).then((res) => {
//   console.log(res)
// })

let task1 = schedule.scheduleJob('1-59 * * * * *', () => {
  console.log('ssssdddddddddd')
});

var mall = new MallDao({
  username : 'Tracy McGrady',
  userpwd: 'abcd',
  userage: {
    dd: {
      name: 'dongjiguo'
    }
  },
  logindate : new Date()
});
mall.save((err, res) => {
  if (err) {
    console.log('发生了错误')
    return
  }
  console.log(res)
})
const request = require('request')
let fs = require('fs')
let craw = require('./root/libs/craw')
let task = require('./root/libs/task')
// ok 继续从这个地方向下入手
task.startAll() // 启动所有定时任务 有没有做成链式调用
// setTimeout(() => {
//   console.log('重启一个定时器')
//   task.edit(100, '1-59 * * * * *')
//   task.start(100)
// }, 15000)


let excel = require('./root/libs/excel')

//
let shopExcel = excel.create()
// 创建一个工作薄
let sheet1 = shopExcel.addSheet('美津浓官方体验店')
sheet1.setHeader('美津浓官方体验店第24周订单', 14)
let subHeader = ['订单号', '下单时间', '省', '市', '联系人', '联系电话', '收货地址', '商品名称', '颜色', '尺码', '数量', '总金额', '买家账号', '学校']
let totalArr = ['统计数据', '周次:2018年第24周', '时间段:03月05日---03月12日', '订单数:24', '总金额:1200.00元']
let data = [{
  id: '201804252203561876567',
  time: '2018-04-25 22:03:56',
  province: '江苏',
  city: '南京',
  linkman: '董文轩',
  tel: '18205185737',
  address: '江苏南京鼓楼区南京大学鼓楼校区',
  gname: '361度男装运动裤夏季男针织长裤361健身训练卫裤百搭长裤 N 碳黑 M',
  color: '蓝白',
  size: 'XL',
  number: '1',
  amonut: '456',
  account: 'xinghuo2018',
  school: '南京大学'
}]
let darkArr = [0, 4, 5, 6, 7, 8, 9, 11]
sheet1.setSubHeader(subHeader)
sheet1.setData(data)
// sheet1.setDarkArr(darkArr) // 貌似这个也不需要
sheet1.setTotalArr(totalArr) // 这个不需要
shopExcel.save()



// 创建一个工作薄（）最简单
// let sheet1 = shopExcel.addSheet('美津浓官方体验店')
// sheet1.setHeader('美津浓官方体验店第24周订单', 14)
// sheet1.setSubHeader(subHeader)
// sheet1.setData(data)

  // /**
  //  * @name 添加一个文件、目录
  //  * @param files 文件目录集合
  //  * @returns none
  //  */
  // add (files) {
  //   let pushFile = (filepath) => {
  //     if (filepath.split('/').indexOf(this.root) === -1) {
  //       throw new Error('设定的文件路径无效')
  //     }
  //     if (this.files.indexOf(filepath) === -1) {
  //       this.files.push(filepath)
  //     }
  //   }
  //   let type = (typeof files)
  //   if (type === 'object') {
  //     for (let i = 0; i < files.length; i++) {
  //       let fpath = files[i]
  //       pushFile(fpath)
  //     }
  //   } else {
  //     pushFile(files)
  //   }
  // }
  //
  // /**
  //  * @name 清空文件集合
  //  * @param cell 单元格 获取文件数
  //  * @returns none
  //  */
  // clean () {
  //   this.files = []
  // }
let task = require('./root/libs/task')
// ok 继续从这个地方向下入手
// 新建一个excel表格
let Excel = require('./excel')
// 为excel表格添加一个工作簿
let excel = new Excel()
let sheet1 = excel.addSheet('美津浓官方体验店')
let header = '美津浓官方体验店第24周订单'
let headerArr = ['订单号', '下单时间', '省', '市', '联系人', '联系电话', '收货地址', '商品名称', '颜色', '尺码', '数量', '总金额', '买家账号', '学校']
let data = [{
  id: '201804252203561876567',
  time: '2018-04-25 22:03:56',
  province: '江苏',
  city: '南京',
  linkman: '董文轩',
  tel: '18205185737',
  address: '江苏南京鼓楼区南京大学鼓楼校区',
  gname: '361度男装运动裤夏季男针织长裤361健身训练卫裤百搭长裤 N 碳黑 M',
  color: '蓝白',
  size: 'XL',
  number: '1',
  amonut: '456',
  account: 'xinghuo2018',
  school: '南京大学'
}]
let totalArr = ['统计数据', '周次:2018年第24周', '时间段:03月05日---03月12日', '订单数:24', '总金额:1200.00元']
let darkArr = [0, 4, 5, 6, 7, 8, 9, 11]
sheet1.setHeader(header, 14)
sheet1.setHeaderArr(headerArr)
sheet1.setData(data)
sheet1.setDarkArr(darkArr)
sheet1.setTotalArr(totalArr)
excel.save()

// setHeader(sheet, 14, '美津浓官方体验店第24周订单')
// setSubHeader(sheet, headers)
// fillSheet(sheet, darkArr, data)
// setTotal(sheet, tdata)
// setColWidth(sheet, 14) // 可以写成链式调用






let tfun = (msg) => {
  let type = msg.type
  // 原来的 更新的 新加的
  if (type === 'detail') { // detail list shop all start end
    let data = msg.data
    let time = (new Date()).toJSON()
    let status = data.isSuccess ? '爬取成功' : '爬取失败'
    let opaStatus = '未知状态'
    if (data.flag === 'origin') {
      opaStatus = '未更新'
    } else if (data.flag === 'fresh') {
      opaStatus = '更新'
    } else if (data.flag === 'add') {
      opaStatus = '新加'
    }
    let str = time + '  ' + status + '  ' + data.title + '  ' + data.shop_title + '  ' + opaStatus
    console.log(str)
  } else {
    console.log(evtObj)
  }
}
let test = (async (value, ms) =>  {
  return Promise
})()
test.then((res) => {
  console.log(res)
})
function timeout(ms) {
    return new Promise((resolve) => {
         setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
  console.log("abc");
}

asyncPrint('hello world', 500);
// id: 'becbb4f7-8d07-4ec9-b9b8-2302cd5da06b',
      // name: '定时任务1',
      // type: '', // 类型 每天 每周 每月
      // belong: '', // 所属店铺
      // funname: 'craw', // 处理函数名称
      // ready: true, // 就绪状态 未启用 已启用
      // rule: '0 29 * * * *', // 执行时间规则
      // params: null, // 附加参数
      // handle: null, // 处理函数
      // status: 'pending', // 运行状态 runing 运行中 pending 挂起中
      // j: null, // 这一个字段的信息不应该保存到数据库中去？
      // desc: '描述', // 描述
      // create_at: '', // 创建时间
      // update_at: '' // 最近更新时间
