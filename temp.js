let Task = require('./root/libs/task')
console.log('here')
console.log(Task)
// 好像感觉越来越晕了
let taskMap = {
  id: 'becbb4f7-8d07-4ec9-b9b8-2302cd5da06b',
  name: '定时任务1',
  type: 1,
  belong: '10000', // 所属店铺
  funname: 'craw',
  ready: true,
  rule: '0,5,10,15,20,25,30,35,40,45,50,55 * * * * *',
  status: 'pending',
  desc: '描述'
}

let tid = Task.add(taskMap)
console.log(tid)



// {
//   id: 'becbb4f7-8d07-4ec9-b9b8-2302cd5da06b',
//     name: '定时任务1',
//   belong: '', // 所属店铺
//   funname: 'craw', // 处理函数名称
//   ready: true, // 就绪状态 未启用 已启用
//   rule: '0 29 * * * *', // 执行时间规则
//   params: null, // 附加参数
//   handle: null, // 处理函数
//   status: 'pending', // 运行状态 runing 运行中 pending 挂起中
//   j: null, // 这一个字段的信息不应该保存到数据库中去？
//   desc: '描述', // 描述
//   creator: '', // 创建者
//   create_at: '', // 创建时间
//   update_at: '' // 最近更新时间
// }

// id: 'becbb4f7-8d07-4ec9-b9b8-2302cd5da06b',
// name: '定时任务1',
// type: '', // 类型 每天 每周 每月
// belong: '', // 所属店铺
// funname: 'craw', // 处理函数名称
// ready: true, // 就绪状态 未启用 已启用
// rule: '0,5,10,15,20,25,30,35,40,45,50,55 * * * * *', // 执行时间规则
// params: null, // 附加参数
// handle: null, // 处理函数 ??
// status: 'pending', // 运行状态 runing 运行中 pending 挂起中 -- ??
// j: null, // 这一个字段的信息不应该保存到数据库中去？
// desc: '描述', // 描述
// create_at: '', // 创建时间
// update_at: '' // 最近更新时间
