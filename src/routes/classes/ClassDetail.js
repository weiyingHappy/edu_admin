import React from 'react'
import { Row, Col,Table } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'

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
      dataIndex: 'userID',
    },

    {
      title: '联系方式',
      render: (r) => (
        r.phone ? r.phone : r.email
      )
    },
    {
      title: '优势测评',
      dataIndex: 'userID',
    },
    {
      title: '职业测评',
      dataIndex: 'userID',
    },

  ]
  return (
    <PageTitle router={app.router} title="班级详情">
      <Mcard>
        <Row>
          <Col span={8}>班级名称：{detail.class_name}</Col>
          <Col span={8}>班级编号：{detail.id}</Col>
          <Col span={8}>学校名称：{detail.school_id}</Col>
          <Col span={8}>人数：{detail.persons}</Col>
        </Row>
      </Mcard>
      {/* <Mcard title="学生列表">
        <Table columns={columns} dataSource={detail.school} rowKey="id" />
      </Mcard> */}
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(ClassDetail)
