module.exports = {
  homePath: '/my', // 登录后进入的页面
  apiPackage: 'admin', // api包名
  openPages: ['/', '/login', '/cs'], // 单页路径（不显示slider的页面）
  productionDomain: 'cooke100.com', // 生产环境域名
  testingDomain: 'lianwuyun.cn', // 测试环境域名
  apiPrefix: { // 不同环境api地址前缀
    production: 'http://www.cooke100.com/api/',
    testing: 'http://test.lianwuyun.cn/newbuy_api/',
    development: 'http://127.0.0.1/edu/api/',
  },
  domain: { // 不同环境本项目访问地址
    production: 'http://www.cooke100.com/admin/',
    testing: 'http://test.lianwuyun.cn/admin/',
    development: 'http://localhost:8000/',
  },
  qiniuPrefix: 'http://ov2ek9bbx.bkt.clouddn.com/', // 七牛前缀
  leaveClean: true, // 离开模块是否清理数据
}
