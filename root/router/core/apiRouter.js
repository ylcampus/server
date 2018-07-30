/*
* 店铺管理
* @author dongjiguo2008123@126.com
*
* @date 2018/04
* */
'use strict'
const express = require('express')
const router = express.Router()

router.use('/role', require('../../controllers/roleController')) // 角色
router.use('/user', require('../../controllers/userController')) // 用户
router.use('/iam', require('../../controllers/iamController')) // IAM
router.use('/task', require('../../controllers/taskController')) // 定时任务
router.use('/file', require('../../controllers/fileController')) // 文件
router.use('/shop', require('../../controllers/shopController')) // 店铺管理
router.use('/member', require('../../controllers/memberController')) // 会员
router.use('/area', require('../../controllers/areaController')) // 区域
router.use('/discount', require('../../controllers/discountController')) // 打折券
router.use('/goods', require('../../controllers/goodsController')) // 商品
router.use('/order', require('../../controllers/orderController')) // 订单
router.use('/total', require('../../controllers/totalController')) // 统计
router.use((req, res, next) => {
  res.status(404).send({
    code: -1,
    data: null,
    message: 'Not Found',
    success: false
  })
})
module.exports = router
