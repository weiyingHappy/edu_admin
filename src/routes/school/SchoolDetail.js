import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
function SchoolDetail({ common, app, loading }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common

  return (
    <PageTitle router={app.router} title="班级详情">
      <Mcard title="基本信息">
        <Row>
          <Col span={8}>学校名称：{detail.school_name}</Col>
          <Col span={8}>学校代码：{detail.school_code}</Col>
        </Row>
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(SchoolDetail)
