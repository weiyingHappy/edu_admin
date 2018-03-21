export function covertUserType(type) {
  switch (+type) {
    case 2:
      return '学生'
    case 3:
      return '老师'
    case 4:
      return '家长'
    default:
      return '游客'
  }
}

export const userType = [
  {
    value: '-1',
    name: ''
  },
  {
    value: '1',
    name: '游客',
  },
  {
    value: '2',
    name: '学生',
  },
  {
    value: '3',
    name: '老师',
  },
  {
    value: '4',
    name: '家长',
  },
]

export const testType = [
  {
    value: '1',
    name: '优势测评'
  },
  {
    value: '2',
    name: '职业'
  },
]
