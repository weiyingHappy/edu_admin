module.exports = {
  menus: [
    {
      id: '1',
      name: '学员管理',
      icon: 'contacts',
      sub: [
        {
          id: '1_1',
          name: '学员列表',
          route: '/user/list/1',
        },
        {
          id: '1_2',
          name: '学校列表',
          route: '/school/list/1',
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
    user: { key: '1', sub: '1_1', name: '学员' },
    member: { key: '6', sub: '6_1', name: '成员' },
    role: { key: '6', sub: '6_2', name: '角色' },
  },
}
