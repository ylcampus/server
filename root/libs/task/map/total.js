/**
 * @name 公共类定时任务
 * @author dongjiguo2008123@126.com
 * @date 2018-07
 */
'use strict'
const co = require('co')
const TotalSerice = require('../../../service/totalService')
const util = require('../../../libs/util')
module.exports = class commonTask {
  // 测试程序
  test (taskId) {
    return () => {
      let Task = require('../index')
      Task.changeStatus(taskId, 1)
      co(function * () {
        let result = yield TotalSerice.getAllVisitData()
        let map = {}
        result.forEach(row => {
          if (!map[row.tenantId]) {
            map[row.tenantId] = [row]
          } else {
            map[row.tenantId].push(row)
          }
        })
        let dayArr = []
        for (let index in map) {
          let row = {
            time: util.getDate()
          }
          let list = map[index]
          row.tenantId = index
          let total = 0
          list.forEach(item => {
            total += parseInt(item.total, 10)
          })
          row.total = total
          dayArr.push(row)
        }

        // 添加数据到按日统计表
        for (let i = 0; i < dayArr.length; i++) {
          let target = dayArr[i]
          // 检查访问统计数据是否存在
          let condition = {
            tenantId: target.tenantId,
            time: target.time
          }
          let flag = yield TotalSerice.isVisitDayDataExist(condition)
          if (!flag) {
            // 添加访问数据
            yield TotalSerice.addVisitDayData(target)
          }
        }
        // 改变定时任务至挂起状态
        // 清空当天访问数据
        Task.changeStatus(taskId, 2)
      })
    }
  }
}
