import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
function InlandSubjectDetail({ common, app, loading, history }) {

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
          <Col span={8}>学科名称：{detail.name}</Col>
          <Col span={8}>专业代码：{detail.code}</Col>
          <Col span={8}>学科编号：{detail.id}</Col>
          <Col span={8}>修业年限：{detail.school_year ? detail.school_year.split('：')[1] : ''}</Col>
          <Col span={8}>授予学士：{detail.degree ? detail.degree.split('：')[1] : ''}</Col>
          <Col span={8}>门类：{detail.category}</Col>
        </Row>
      </Mcard>
      <Mcard title="业务培养目标">
        <p>{detail.goal}</p>
      </Mcard>
      <Mcard title="毕业生应获得以下几方面的知识和能力">
        <p>{detail.ability}</p>
      </Mcard>
      <Mcard title="主要课程">
        <p>{detail.course}</p>
      </Mcard>
      <Mcard title="主要实践性教学环节">
        <p>{detail.practice}</p>
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {

  return { loading, common, app }
}

export default connect(mapStateToProps)(InlandSubjectDetail)
