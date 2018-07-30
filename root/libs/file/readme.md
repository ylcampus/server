// 从这个地方入手继续
console.log(1111111111)
let path = require('path')
// api/fileList GET 获取文件列表
// api/downloadFile GET 文件下载
// api/fileOverView GET 文件预览
process.env.rootPath = path.resolve(__dirname)

// 1:读取文件目录
// 2:获取目录树 -- 只包含目录信息  -- 既包含目录 又包含文件信息
// 3：删除文件
// 4:文件下载
// 5:文件预览
//  ---- ？ 最好不要让他报错


let myfile = require('./root/libs/file')
// let result = myfile.readDirSync('shop')
// console.log(result)
// let result2 = myfile.mkDirSync('ss/sfsdf/jk.jpg')
// console.log(path.dirname('static'))
let result = myfile.rmDirSync('temp')
console.log(result)
// 需要改动的地方还真不少？
