module.exports = {
  menus: [
    {
      id: '1',
      name: '账户管理',
      icon: 'shopping-cart',
      route: '/role/list/1'
    },
    {
      id: '3',
      name: '订单管理',
      icon: 'shopping-cart',
      sub: [
        {
          id: '3_1',
          name: '订单列表',
          route: '/order/list/1',
        },
      ],
    },
    {
      id: '6',
      name: '系统设置',
      icon: 'tool',
      sub: [
        {
          id: '6_1',
          name: '成员管理',
          route: '/member/list/1',
          fid: '1'
        },
        // {
        //   id: '6_2',
        //   name: '角色管理',
        //   route: '/role/list/1',
        //   fid: '2'
        // },
      ],
    },
    {
      id: '7',
      name: '班级管理',
      icon: 'solution',
      sub: [
        {
          id: '7_1',
          name: '班级列表',
          route: '/classes/list/1',
        }
      ],
    },
    {
      id: '8',
      name: '学员管理',
      icon: 'team',
      sub: [
        {
          id: '8_1',
          name: '学员列表',
          route: '/student/list/1',
        }
      ],
    },
  ],

  openkeys: {
    order: { key: '3', sub: '3_1', name: '订单' },
    member: { key: '6', sub: '6_1', name: '成员' },
    role: { key: '1', name: '角色' },
    classes: { key: '7', sub: '7_1', name: '班级' },
    student: { key: '8', sub: '8_1', name: '学员' }
  },
}
