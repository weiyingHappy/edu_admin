import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
import { SelfDataTable } from '../../components/General'
function ClassDetail({ common, app, loading }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '账号',
      dataIndex: 'userID',
    },
    {
      title: '班级',
      dataIndex: 'class_name',
    },

    {
      title: '联系方式',
      render: (r) => (
        r.phone ? r.phone : r.email
      )
    },
    {
      title: '优势测评',
      dataIndex: 'buy_profile',
    },

  ]

  return (
    <PageTitle router={app.router} title="班级详情">
      <Mcard title="基本信息">
        <Row>
          <Col span={8}>班级名称：{detail.class_name}</Col>
          <Col span={8}>班级编号：{detail.id}</Col>
          <Col span={8}>学校名称：{detail.school ? detail.school.school_name : ''}</Col>
          <Col span={8}>人数：{detail.persons}</Col>
        </Row>
      </Mcard>
      <Mcard title="学生列表">
        <SelfDataTable columns={columns} url="ClassManage/listStudent" params={{ class_id: detail.id }} rowKey="id" />
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(ClassDetail)
