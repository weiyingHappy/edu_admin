/**
 * 配置路由信息
 * 完整结构：
 model:{
   model: 'model',  // 模块名称
   noadd: false,    // 是否注册add页面
   nodetail: false, // 是否注册detail页面
   nolist: false,   // 是否注册list页面
   folder: 'admin', // 页面文件所在文件夹名称，不填则读取配置为model的文件夹
   lazy: true,      // 懒人模式，开启后不需要在models文件夹中添加相应的model，转而使用common
   cus: 'Admin'     // 请求Api模块名称，配置后使用改配置而不使用model，默认使用model
 }
*/
module.exports = {
  modelRoute: {
    order: {
      model: 'order',
      noadd: true,
    },
    member: {
      model: 'member',
      folder: 'admin',
      lazy: true,
      cus: 'Admin',
    },
    role: {
      model: 'role',
      folder: 'admin',
      lazy: true,
      cus: 'Admin',
    },
    classes: {
      model:'classes',
    },
    student: {
      model:'student'
    }
  },
}
