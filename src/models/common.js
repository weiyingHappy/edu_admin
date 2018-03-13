import modelExtend from 'dva-model-extend'
import { autoModel } from './auto'
import { analyzePath } from '../utils/utils'

export default modelExtend(autoModel, {
  namespace: 'common',

  effects: {
    * initState(params, { call, put, select }) {
      const { historys, router } = yield select(_ => _.app)
      const lastModel = analyzePath(historys[1] || '')
      if (lastModel.model !== router.model) {
        yield put({
          type: 'resetState',
        })
      }
    }
  }
})
