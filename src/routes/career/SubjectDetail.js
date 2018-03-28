import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
function ProfessionDetail({ common, app, loading,history }) {

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
          <Col span={8}>职业编号：{detail.class_name}</Col>
          <Col span={8}>职业评级：{detail.id}</Col>
          <Col span={8}>学校名称：{detail.school ? detail.school.school_name : ''}</Col>
          <Col span={8}>人数：{detail.persons}</Col>
        </Row>
      </Mcard>
      <Mcard title="职业定义">
        <p>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</p>
      </Mcard>
      <Mcard title="日常工作">
        <p>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</p>
      </Mcard>
      <Mcard title="工作特点">
        <p>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</p>
      </Mcard>
      <Mcard title="知识要求">
        <p>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</p>
      </Mcard>
      <Mcard title="个性要求">
        <p>嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</p>
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(ProfessionDetail)
