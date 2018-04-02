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
export const categoryType = [{ "name": "全部", "value": "-1" },{ "name": "工学", "value": "工学" }, { "name": "理学", "value": "理学" }, { "name": "农学", "value": "农学" }, { "name": "医学", "value": "医学" }, { "name": "教育学", "value": "教育学" }, { "name": "管理学", "value": "管理学" }, { "name": "经济学", "value": "经济学" }, { "name": "哲学", "value": "哲学" }, { "name": "文学", "value": "文学" }, { "name": "法学", "value": "法学" }, { "name": "历史学", "value": "历史学" }]
export const levelType = [
  {
    value: '-1',
    name: '全部'
  },
  {
    value: '1',
    name: '1'
  },
  {
    value: '2',
    name: '2'
  },
  {
    value: '3',
    name: '3'
  },
  {
    value: '4',
    name: '4'
  },
  {
    value: '5',
    name: '5'
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
