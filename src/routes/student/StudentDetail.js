import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { AdminFuncsEdit } from '../../components/Special'
import { Mcard, PageTitle, MySpin } from '../../layouts'

function StudentDetail({ common, app, loading }) {

  if (!app.init ) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common

  return (
    <PageTitle router={app.router} title="角色详情">
      <Mcard>
        <Row>
          <Col span={8}>角色名称：{detail.name}</Col>
          <Col span={8}>角色编号：{detail.code}</Col>
        </Row>
      </Mcard>
      <Mcard title="角色权限">
        <AdminFuncsEdit roleId={detail.id} />
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(StudentDetail)
