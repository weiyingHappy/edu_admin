import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import cookie from 'js-cookie'
import { filterData, analyzePath, log } from '../utils/utils'
import { homePath } from '../configs/config'
import { loginInfo, login, qiuniuToken, cusRequest } from '../services/base'
import { modelRoute } from '../configs/router.config'

export default {

  namespace: 'app',

  state: {
    init: false,
    user: {},
    router: {},
    siderFold: false,
    locationPathname: '',
    locationQuery: {},
    historys: [], // 记录历史查看记录，最多5个
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log('setup')
      dispatch({ type: 'query' })
    },

    setupHistory({ dispatch, history }) {
      console.log('setuphistory')
      history.listen((location) => {
        const routers = analyzePath(location.pathname)
        if (!routers) {
          return
        }
        routers.cfg = modelRoute[routers.model] || { lazy: false }
        routers.codeModel = routers.cfg.lazy ? 'common' : routers.model

        log('routes[]', routers)
        dispatch({
          type: 'upStateAndHistory',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
            router: routers,
          },
        })

        if (routers.cfg.lazy) {
          dispatch({
            type: 'common/initState'
          })
        }

        dispatch({
          type: `${routers.codeModel}/query`,
        })
      })
    },

  },

  effects: {
    * query({ payload }, { call, put, select }) {
      console.log('query')
      const data = yield call(loginInfo, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (filterData(data)) {
        // 已经是登陆用户
        yield put({
          type: 'updateState',
          payload: {
            init: true,
            user: data.results,
          },
        })
        if (locationPathname === '/login') {
          yield put(routerRedux.push({
            pathname: homePath,
          }))
        }
      } else {
        // 获取登陆信息失败，进入登陆页面
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    * login({ payload }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (filterData(data)) {
        // 登陆成功，设置session-token
        cookie.set('token', data.results.token, { expires: 1, path: '' })
        const { from } = locationQuery
        yield put({ type: 'query' })
        if (!from || from === '/login' || from === '/') {
          yield put(routerRedux.push(homePath))
        } else {
          yield put(routerRedux.push(from))
        }
      }
    },

    * qiuniuToken({ payload }, { call }) {
      const data = yield call(qiuniuToken, payload)
      if (filterData(data)) {
        cookie.set('qiniutoken', data.results.token, { expires: 1, path: '' })
      }
    },

    * request({ uri, data, callback }, { call }) {
      const response = yield call(cusRequest, uri, data)
      if (filterData(response)) {
        callback(response)
      }
    },

    * componentRequest({ uri, data, callback }, { call }) {
      const response = yield call(cusRequest, uri, data)
      if (filterData(response)) {
        callback(response)
      }
    },

    * logout({ payload }, { put }) {
      cookie.remove('token')
      yield put(routerRedux.push('/login'))
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    upStateAndHistory(state, { payload }) {
      const _historys = state.historys
      while (_historys.length > 4) {
        _historys.pop()
      }
      _historys.unshift(payload.locationPathname)
      return {
        ...state,
        ...payload,
        historys: _historys,
      }
    },
  },

};
