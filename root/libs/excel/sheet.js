/**
 * @name 工作簿类
 * @author dongjiguo2008123@126.com
 * @date 2018-04
 */
'use strict'
module.exports = class sheet {
  constructor (sheet) {
    this.sheet = sheet // 工作簿对象
    this.header = null // 表头
    this.subHeaderArr = [] // 子表头
    this.data = [] // 表格数据
    this.darkArr = [] // 斑马线数组
    this.totalArr = [] // 统计数据数组
    this.hMerge = 0 // 表头行合并数
    this.headerHeight = 0.8 // 表头行高 0.8厘米
    this.totalHeight = 0.6 // 统计表头行高
    this.headerColor = 'FFFFFF' // 表头字体颜色
    this.headerFontSize = 14 // 表头字体颜色
    this.light = 'ffded9d4' // 浅色
    this.dark = 'ff7e6a54' // 深色
    this.colors = ['ffffffff', 'ffa2917d', 'ffe4e2de', 'fffff8df', 'fff1eeec'] // 颜色数组
    this.defaultFontSize = 12 // 默认字体大小
    this.defaulthHeight = 0.5 // 默认行高0.5cm
  }
  // 设置表头
  setHeader (val, hMerge) {
    this.header = val
    this.hMerge = hMerge
  }
  // 设置头部标题数组
  setSubHeader (arr) {
    this.subHeaderArr = arr
  }
  // 设置表格数据
  setBody (val) {
    this.data = val
  }
  // 设置斑马线数组
  setDarkArr (val) {
    this.darkArr = val
  }
  // 设置统计数据数据
  setTotalArr (val) {
    this.totalArr = val
  }
  /**
   * @name 为单元格设置边框
   * @param cell 单元格
   * @param top 上边框
   * @param right 有边框
   * @param bottom 下边框
   * @param left 左边框
   * @returns none
   */
  _border (cell, top, right, bottom, left) {
    cell.style.border.top = 'thin'
    cell.style.border.topColor = top ? this.dark : this.light
    cell.style.border.bottom = 'thin'
    cell.style.border.bottomColor = bottom ? this.dark : this.light
    cell.style.border.left = 'thin'
    cell.style.border.leftColor = left ? this.dark : this.light
    cell.style.border.right = 'thin'
    cell.style.border.rightColor = right ? this.dark : this.light
  }

  /**
   * @name 为单元格设置边框
   * @param cell 单元格
   * @param type 颜色类型
   * @returns none
   */
  _fill (cell, type) {
    type = type || 0
    cell.style.fill.patternType = 'solid'
    cell.style.fill.fgColor = this.colors[type]
    cell.style.fill.bgColor = 'ffffffff'
  }

  /**
   * @name 设置表头
   * @returns none
   */
  _setHeader () {
    const row = this.sheet.addRow()
    row.setHeightCM(this.headerHeight) // 设置行高
    const cell = row.addCell()
    cell.value = this.header // 单元框值
    cell.hMerge = this.hMerge - 1 // 行合并数
    this._fill(cell, 1) // 设置填充色
    cell.style.align.h = 'center' // 行对其方式
    cell.style.align.v = 'center' // 行对其方式
    cell.style.font.color = this.headerColor // 字体颜色
    cell.style.font.size = this.headerFontSize // 字体大小
    cell.style.font.bold = true // 加粗
  }

  /**
   * @name 设置子表头
   * @returns none
   */
  _setSubHeader () {
    const row = this.sheet.addRow()
    row.setHeightCM(this.defaulthHeight)
    for (let i = 0; i < this.subHeaderArr.length; i++) {
      const hc = row.addCell()
      hc.value = this.subHeaderArr[i]
      hc.style.align.h = 'center'
      hc.style.font.size = this.defaultFontSize // 字体大小
      hc.style.font.bold = true // 加粗
      this._border(hc, 1, 1, 1, 0)
    }
  }

  /**
   * @name 填充工作簿
   * @returns none
   */
  _fillSheet () {
    // 错误检测 - 明天做
    // let len = this.data.length
    // let obj = len[0]
    // console.log(this.colLen)
    // console.log(len)
    // if (this.colLen !== len || len === 0) {
    //   throw new Error('数据长度与子表头长度不匹配')
    // }
    for (let i = 0; i < this.data.length; i++) {
      const row = this.sheet.addRow()
      row.setHeightCM(this.defaulthHeight)
      let arr = Object.values(this.data[i])
      for (let j = 0; j < arr.length; j++) {
        const cell = row.addCell()
        cell.value = arr[j]
        if (j > 0) cell.style.align.h = 'center'
        cell.style.font.size = this.defaultFontSize // 字体大小
        if (this.darkArr.indexOf(j) !== -1) {
          this._fill(cell, 4) // 设置填充色
        }
        this._border(cell, 0, 1, 1, 0)
      }
    }
  }

  /**
   * @name 设置统计数据
   * @returns none
   */
  _setTotal () {
    let len = this.totalArr.length
    for (let i = 0; i < len; i++) {
      const row = this.sheet.addRow()
      if (i === 0) {
        row.setHeightCM(this.headerHeight)
      } else {
        row.setHeightCM(this.totalHeight)
      }
      const cell = row.addCell()
      if (i === 0) {
        cell.style.font.bold = true
        this._border(cell, 1, 1, 1, 0)
      } else if (i === len - 1) {
        this._fill(cell, 4)
        this._border(cell, 0, 1, 1, 0)
      } else {
        this._fill(cell, 4)
        this._border(cell, 0, 1, 0, 0)
      }
      cell.value = this.totalArr[i]
      cell.style.align.v = 'center'
    }
  }

  /**
   * @name 设置列宽
   * @returns none
   */
  _setColWidth () {
    for (let i = 0; i < 14; i++) {
      let width = 10
      if (i === 0) {
        width = 30
      }
      this.sheet.col(i).width = width
    }
  }

  /**
   * @name 执行创建表格操作excuse
   * @returns none
   */
  _execute () {
    if (this.header) {
      this._setHeader()
    }
    if (this.subHeaderArr.length > 0) {
      this._setSubHeader()
    }
    if (this.data.length > 0) {
      this._fillSheet()
    }
    if (this.totalArr.length > 0) {
      this._setTotal()
    }
    if (this.sheet.col.length > 0) {
      this._setColWidth()
    }
  }
}
