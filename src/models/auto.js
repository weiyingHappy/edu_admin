import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { query } from '../services/base'
import { leaveClean } from '../configs/config'
import { log, filterData, analyzePath } from '../utils/utils'

export const model = {
  reducers: {
    success(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

/**
 * 所有自动化model的基类
**/
export const autoModel = modelExtend(model, {

  state: {
    lists: null,
    detail: null,
    nowPage: 1,
    count: 0,
    search: {},
    modelspace: null,
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'query',
      })
    },
  },

  effects: {
    // 通用查询，主要是查询list和detail
    * query({ payload, source }, { call, put, select, take }) {
      const { router, historys } = yield select(_ => _.app)

      if (leaveClean === true) {
        const lastHref = analyzePath(historys[1] || '/')
        // 离开清空模式，离开当前模块，需要清空model信息
        if (lastHref.model !== router.model) {
          yield put({
            type: `${lastHref.model}/resetState`,
          })
        }
      }

      if (router.action !== 'list' && router.action !== 'detail') {
        log('非标准的路由，不做操作', router)
        return
      }

      const currentModel = yield select(_ => _[router.codeModel])
      let newPayload = { ...payload }
      if (currentModel) {
        newPayload = { ...currentModel.search, ...payload }
      }
      if (!newPayload.page) {
        newPayload.page = currentModel ? currentModel.nowPage : 1
      }
      // 对请求结果进行对应的处理，list的请求和detail的请求分开处理
      const data = yield call(query, router, newPayload)
      if (filterData(data)) {
        const toSetState = { modelspace: router.model }
        if (router.action === 'list') {
          toSetState.lists = data.results.lists
          toSetState.nowPage = data.results.nowPage
          toSetState.count = data.results.count
        } else {
          toSetState.detail = data.results
        }
        yield put({
          type: 'success',
          payload: { ...toSetState },
        })
      }
    },

    // 通用编辑，主要用于增删改数据
    // 参数action包括 add,edit,del
    // 参数didAction,运行完后执行的动作,为一个对象{type:x,cb},通过type区分动作
    * edit({ payload, action, didAction }, { call, put, select }) {
      const { router } = yield select(_ => _.app)
      const data = yield call(query, router, payload, action)
      if (filterData(data, true)) {
        if (didAction) {
          // 运行完后执行的动作
          // 0执行传入的回掉cb
          // 1执行query方法，通常为刷新列表或详情数据
          // 2跳转到列表页面
          switch (didAction.type) {
            case 0:
              didAction.cb()
              break
            case 2:
              yield put(routerRedux.push(`/${router.model}/list/1${router.cus ? `/${router.cus}` : ''}`))
              break
            case 1:
            default:
              yield put({ type: 'query' })
          }
        }
      }
    },

  },

  reducers: {
    changeSearch(state, { payload }) {
      return {
        ...state,
        search: { ...state.search, ...payload },
      }
    },

    clearSearch(state) {
      return { ...state, search: {} }
    },

    resetState(state) {
      return {
        ...state,
        lists: null,
        detail: null,
        nowPage: 1,
        count: 0,
        search: {},
      }
    },

  },

})
