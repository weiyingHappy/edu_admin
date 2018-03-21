import React from 'react'
import { Row, Col, Card } from 'antd'
import { connect } from 'dva'
import { AdminFuncsEdit } from '../../components/Special'
import { Mcard, PageTitle, MySpin } from '../../layouts'
import { covertUserType } from '../../utils/convert'

function ClassesDetail({ common, app, loading }) {

  // if (!app.init || !app.user.funcs.includes('2')) {
  //   return <Mcard><h1>404 Not Found</h1></Mcard>
  // }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common

  return (
    <PageTitle router={app.router} title="账户详情">
      <Mcard title="基本信息">
        <Row>
          <Col span={8}>账号：{detail.userID}</Col>
          <Col span={8}>姓名：{detail.name}</Col>
          <Col span={8}>手机：{detail.phone}</Col>
          <Col span={8}>角色：{covertUserType(detail.roles_id)}</Col>
        </Row>
      </Mcard>
      <Mcard title="购买信息">
        <Row>
          <Col span={8}>购买项目：优势测评</Col>
          <Col span={8}>购买方式：统一签约</Col>
        </Row>
        <Row>
          <Col span={8}>购买项目：职业测评</Col>
          <Col span={8}>购买方式：自行购买</Col>
          <Col span={8}>订单号：</Col>
          <Col span={8}>购买时间：</Col>
          <Col span={8}>订单金额：</Col>
        </Row>
      </Mcard>
      <Mcard title="测评信息">
        <p>优势测评</p>
        <Row>
          <Col span={8}>测试进度：</Col>
          <Col span={8}>最近测试时间：</Col>
        </Row>
        <p>职业测评</p>
        <Row>
          <Col span={8}>测试进度：</Col>
          <Col span={8}>最近测试时间：</Col>
        </Row>
      </Mcard>
      <Mcard title="家属信息">
        <Row>
          <Col span={8}>账号：</Col>
          <Col span={8}>手机：</Col>
          <Col span={8}>姓名：</Col>
          <Col span={8}>角色：</Col>
        </Row>
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(ClassesDetail)
