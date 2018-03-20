export function covertUserType(type) {
  switch (type) {
    case 2:
      return '学员'
    case 3:
      return '教师'
    case 4:
      return '家长'
    default:
      return '游客'
  }
}
