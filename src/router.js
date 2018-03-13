import React from 'react';
import { routerRedux, Redirect, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { modelRoute } from './configs/router.config'
import { upperModel } from './utils/utils'
import App from './routes/app'

const { ConnectedRouter } = routerRedux;
function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })

  // 不需要自动生成的router可以手动写在下面
  let routes = [
    {
      path: '/login',
      models: () => [],
      component: () => import('./routes/login/'),
    },
    {
      path: '/my',
      models: () => [],
      component: () => import('./routes/admin/My'),
    },
  ]

  // 根据配置自动生成路由和model
  // 例如有一个叫order的model会生成
  // path: /order/(list/detail/add)/:id/[cus]
  // list add detail 分别对应 列表 添加 详情页面
  const getRouterObj = (item, action) => {
    const um = upperModel(item.model)
    const ua = upperModel(action)
    const folder = item.folder || item.model

    const r = {}
    r.path = `/${item.model}/${action}/:id`;
    if(item.lazy !== true){
      r.models = () => [import(`./models/${item.model}`)];
    }
    r.component = () => import(`./routes/${folder}/${um}${ua}`);
    return r
  }

  for (const i in modelRoute) {
    const item = modelRoute[i]
    if (item.nolist !== true) {
      routes.push(getRouterObj(item, 'list'))
    }
    if (item.noadd !== true) {
      routes.push(getRouterObj(item, 'add'))
    }
    if (item.nodetail !== true) {
      routes.push(getRouterObj(item, 'detail'))
    }
  }

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/login" />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </App>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
