/**
 * @name 定时任务执行函数地图
 * @author dongjiguo2008123@126.com
 * @date 2018-07
 */
'use strict'
const OrderTask = require('./order')
const TotalTask = require('./total')
module.exports.orderTask = new OrderTask() // 订单类定时任务
module.exports.totalTask = new TotalTask() // 统计类定时任务
