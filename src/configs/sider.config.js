module.exports = {
  menus: [
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
        {
          id: '6_2',
          name: '角色管理',
          route: '/role/list/1',
          fid: '2'
        },
      ],
    },
  ],

  openkeys: {
    order: { key: '3', sub: '3_1', name: '订单' },
    member: { key: '6', sub: '6_1', name: '成员' },
    role: { key: '6', sub: '6_2', name: '角色' },
  },
}
