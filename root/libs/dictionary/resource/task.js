/*
* 系统定时任务
* @author dongjiguo2008123@126.com
*
* @date 2018/06
* */
module.exports = [
  {
    taskId: '10000',
    name: '按日访问数据统计',
    type: 1, // 每天 每周 每月
    tag: 1,
    tenantId: '10000',
    tenantName: null,
    module: 'total', // 所属模块
    handle: 'test', // 处理函数
    params: null,
    ready: true, // 就绪状态
    rule: '0 50 23 * * *', // 定时规则
    status: 'pending', // 运行状态
    desc: '统计类定时任务，每天23:30:00统计当天访问数据到visit_day表' // 描述
  }
]
