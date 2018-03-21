module.exports = {
  menus: [
    {
      id: '1',
      name: '账户管理',
      icon: 'contacts',
      route: '/user/list/1'
    },
    {
      id: '2',
      name: '学校管理',
      icon: 'contacts',
      route: '/school/list/1'
    },
    // {
    //   id: '3',
    //   icon: 'tool',
    //   name: '角色管理',
    //   route: '/role/list/1'
    // },
    {
      id: '4',
      name: '班级管理',
      icon: 'solution',
      route: '/class/list/1'
    },
    // {
    //   id: '5',
    //   name: '学员管理',
    //   icon: 'team',
    //   route: '/student/list/1'
    // },
  ],

  openkeys: {
    user: { key: '1', sub: '1_1', name: '账户' },
    school: { key: '2', name: '学校' },
    role: { key: '3', name: '角色' },
    class: { key: '4', sub: '4_1', name: '班级' },
    student: { key: '5', sub: '5_1', name: '学员' }
  },
}
