import modelExtend from 'dva-model-extend'
import { autoModel } from './auto'

export default modelExtend(autoModel, {
  namespace: 'student',
})
