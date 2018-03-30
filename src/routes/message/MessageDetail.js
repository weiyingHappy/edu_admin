import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
import { covertWordsType } from '../../utils/convert'

function MessageDetail({ common, app, loading,history }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common

  return (
    <PageTitle router={app.router} title="职业详情">
      <Mcard title="基本信息">
        <Row>
          <Col span={8}>姓名：{detail.name}</Col>
          <Col span={8}>联系方式：{detail.id}</Col>
          <Col span={8}>留言分类：{covertWordsType(detail.type)}</Col>
        </Row>
      </Mcard>
      <Mcard title="留言信息">
        <p>{detail.message}</p>
      </Mcard>

    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(MessageDetail)
