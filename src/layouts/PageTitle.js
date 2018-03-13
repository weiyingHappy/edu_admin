import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import { openkeys } from '../configs/sider.config'
import styles from './index.less'

const PageTitle = ({ children, router, title, noback, nobread, bread }) => {

  const gentBread = () => {
    if (nobread) {
      return null
    }
    if (bread) {
      return (
        <Breadcrumb className={styles.breadcrumb}>
          {
            bread.map((item)=>{
              return(
                <Breadcrumb.Item>{item.route ? <Link to={item.route}>{item.name}</Link> : item.name}</Breadcrumb.Item>
              )
            })
          }
        </Breadcrumb>
      )
    }
    const open = openkeys[router.model]
    if (!open) {
      return ''
    }

    let actionName = '列表'
    if (router.originAction === 'add') {
      actionName = '添加'
    } else if (router.originAction === 'detail') {
      actionName = '详情'
    }

    return (
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item><Link to={`/${router.model}/list/1}`}>{`${open.name}管理`}</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{open.name + actionName}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  return (
    <div>
      <div className={styles.pageTitle}>
        {gentBread()}
        {title && <h1 className={styles.title}>{!noback && <Icon className={styles.back} onClick={() => { window.history.go(-1) }} type="rollback" />}{title}</h1>}
      </div>
      {children}
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string, // 标题
  noback: PropTypes.bool, //是否显示返回按钮, 默认显示
  nobread: PropTypes.bool, //是否显示面包屑, 默认显示
  bread: PropTypes.object, //自定义面包屑格式[{name:"名称", route:"/"},]
}

export default PageTitle
