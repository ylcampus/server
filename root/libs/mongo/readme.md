#PART-1 使用
  #使用示例-1
  let mongoDb = require('./root/libs/mongo')
  mongoDb.model('resource').create({ name:"最新测试", age:227}, function(error,doc){
    if(error) {
      console.log(error);
    } else {
      console.log(doc);
    }
  })
  #使用示例-2
  let mongoDb = require('./root/libs/mongo')
  mongoDb.model('resource').create({ name:"最新测试2", age:227}).then((res) => {
    console.log(res)
  })

#PART-2 表结构(详情见models)
  2-1：售后服务表
  2-2：区域表
  2-3：打折券表
  2-4:财务表
  2-5：商品表
  2-6：订单表
  2-7：资源表
  2-8：角色表
  2-9：店铺表
  2-10：定时任务表
  2-11：用户表

#PART-3 版本信息 v1.0.0
