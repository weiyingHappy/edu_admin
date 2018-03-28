/* global window */
import React from 'react'
import NProgress from 'nprogress'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
import { Header, Sider } from '../layouts'
import Loader from '../components/General/Loader/Loader'
import { openPages } from '../configs/config'
import { withRouter } from 'dva/router'

let lastHref

const App = ({ children, app, loading, location, dispatch }) => {
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`

  const { href } = window.location

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  if (openPages && openPages.includes(pathname)) {
    return (
      <div>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        {children}
      </div>)
  }

  const { user, router, siderFold } = app

  const switchSider = () => {
    dispatch({ type: 'app/switchSider' })
  }

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch({
        type: 'app/logout',
      })
    }else if(key === 'my'){
      dispatch(routerRedux.push('/my'))
    }
  }
  return (
    <div style={{height:'100%',minWidth:'1200px'}}>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Layout style={{height:'100%'}}>
        <Sider
          router={router}
          siderFold={siderFold}
          user={user}
        />
        <Layout style={{height:'100%'}}>
          <Header
            switchSider={switchSider}
            siderFold={siderFold}
            onMenuClick={handleMenuClick}
            user={user}
          />
          <Layout.Content>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
