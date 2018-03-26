module.exports = {
  homePath: '/my', // 登录后进入的页面
  apiPackage: 'Admin', // api包名
  openPages: ['/', '/login', '/cs'], // 单页路径（不显示slider的页面）
  productionDomain: 'hotelets.com', // 生产环境域名
  testingDomain: 'lianwuyun.cn', // 测试环境域名
  apiPrefix: { // 不同环境api地址前缀
    production: 'http://www.hotelets.com/edu_api/api/',
    testing: 'http://www.lianwuyun.cn/edu_api/api',
    development: 'http://www.lianwuyun.cn/edu_api/api',
    // development: 'http://127.0.0.1/edu/api/',
  },
  domain: { // 不同环境本项目访问地址
    production: 'http://www.hotelets.com/admin/',
    testing: 'http://lianwuyun.cn/admin/',
    development: 'http://localhost:8000/',
  },
  qiniuPrefix: 'http://ov2ek9bbx.bkt.clouddn.com/', // 七牛前缀
  leaveClean: true, // 离开模块是否清理数据
}
