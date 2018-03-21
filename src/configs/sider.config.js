module.exports = {
  menus: [
    {
      id: '1',
      name: '学员管理',
      icon: 'contacts',
      sub: [
        // {
        //   id: '1_1',
        //   name: '学员列表',
        //   route: '/user/list/1',
        // },
        {
          id: '1_2',
          name: '学校列表',
          route: '/school/list/1',
        },
      ],
    },
    {
      id: '2',
      name: '账户管理',
      icon: 'contacts',
      route: '/user/list/1'
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
        },
        {
          id: '6_2',
          name: '角色管理',
          route: '/role/list/1',
        },
      ],
    },
    {
      id: '7',
      name: '班级管理',
      icon: 'solution',
      route: '/class/list/1'
    },
    {
      id: '8',
      name: '学员管理',
      icon: 'team',
      route: '/student/list/1'
    },
  ],

  openkeys: {
    user: { key: '1', sub: '1_1', name: '学员' },
    member: { key: '6', sub: '6_1', name: '成员' },
    role: { key: '1', name: '角色' },
    classes: { key: '7', sub: '7_1', name: '班级' },
    student: { key: '8', sub: '8_1', name: '学员' }
  },
}
