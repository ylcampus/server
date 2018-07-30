/**
 * @name 配置文件
 * @author dongjiguo2008123@126.com
 * @date 2018-07
 * @desc 为了应对反扒，尽量模拟浏览器访问行为
 */
'use strict'
module.exports = {
  timeStamp: 30 * 24 * 3600 * 1000, // 商品数据保鲜时间戳-一个月更新一次
  // 延时策略 -生成符合特定正态分布的时间戳
  policy: [5, 8, 5, 60, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  detail: { // 商品详情-配置
    min: 2000, // 最小延迟时间-单位ms
    headers: {
      'authority': 'detail.tmall.com',
      'method': 'GET',
      'path': null,
      'scheme': 'https',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.8',
      'cache-control': 'max-age=0',
      'referer': null,
      'upgrade-insecure-requests': 1,
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    },
    descHeaders: { // 商品描述接口请求头 - http
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.62 Safari/537.36'
    },
    picHeaders: { // 商品图片下载
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      'upgrade-insecure-requests': 1
    },
    picDelayTime: 500,
    uri: {
      protocol: 'https',
      hostname: null,
      pathname: 'detail.tmall.com:443/item.htm',
      query: {
        spm: null,
        id: null,
        scene: 'taobao_shop'
      },
      referer: {
        spm: null,
        scene: 'taobao_shop'
      }
    }
  },
  page: { // 商品列表
    min: 5000,
    defaultUrl: null,
    headers: { // 爬取商品列表接口响应头
      'authority': 'mizuno.m.tmall.com',
      'method': 'GET',
      'path': null,
      'scheme': 'https',
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9',
      'referer': null,
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      'upgrade-insecure-requests': 1,
      'cache-control': 'max-age=0'
    },
    uri: {
      protocol: 'https',
      hostname: null,
      port: 443,
      query: {
        spm: null,
        suid: null,
        sort: 's',
        p: null,
        page_size: '12',
        from: 'h5',
        shop_id: null,
        ajson: '1',
        _tm_source: 'tmallsearch',
        callback: null
      },
      pathname: '/shop/shop_auction_search.do',
      pathHtml: '/shop/shop_auction_search.htm'
    },
    cookie: { // 默认cookie
      cna: null,
      tk_trace: '1',
      _m_h5_tk: null,
      _m_h5_tk_enc: null,
      isg: null
    }
  },
  shop: { // 店铺
    min: 2 * 1000
  }
}
