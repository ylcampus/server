#目的
#用于订单报表财务报表等的生成
#使用方法
let excel = require('./root/libs/excel')
let shopExcel = excel.create()
//创建一个工作薄
let sheet1 = shopExcel.addSheet('美津浓官方体验店')
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
//设置表头-必选
sheet1.setHeader('美津浓官方体验店第24周订单', 14)
//设置子表头-必选
sheet1.setSubHeader(subHeader)
//设置表格数据-必选
sheet1.setBody(data)
//设置统计数据-可选
sheet1.setTotalArr(totalArr)
//保存表格
shopExcel.save()
