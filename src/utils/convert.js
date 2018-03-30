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
    name: '全部',
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
    name: '职业测评'
  },
  {
    value: '2',
    name: '优势测评'
  },
]
export function covertBuyType(type) {
  switch (+type) {
    case 1:
      return '统一签约'
    case 2:
      return '自行购买'
    default:
      return '统一签约'
  }
}
//一期无自行购买
export const buyType = [
  {
    value: '1',
    name: '统一签约'
  },
  // {
  //   value: '2',
  //   name: '自行购买'
  // },
]

export const wordsType = [
  {
    value: '-1',
    name: '全部'
  },
  {
    value: '1',
    name: '咨询类'
  },
  {
    value: '2',
    name: '业务类'
  },
]
export function covertWordsType(type) {
  switch (+type) {
    case 1:
      return '咨询类'
    case 2:
      return '业务类'
    default:
      return '咨询类'
  }
}
export function clearString(s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
