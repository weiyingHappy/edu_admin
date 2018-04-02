import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
import { SelfDataTable, EditableInput } from '../../components/General'
import { apiPrefix } from '../../utils/utils'
function ClassDetail({ common, app, loading, history }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }
  const editCallback = () => {
    history.push(`/${app.router.model}/detail/${common.detail.id}`)
  }
  const { detail } = common
  const sColumns = [
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
      title: '优势测评', //职业测评第一位，优势测评第二位
      render: (r) => (
        <span>{(r.buy_profile)[1] == 1 ? '已完成' : '未完成'}</span>
      )
    },
    {
      title: '职业测评',
      render: (r) => (
        <span>{(r.buy_profile)[0] == 1 ? '已完成' : '未完成'}</span>
      )
    },
    {
      title: '操作',
      render(record) {
        return (
          <div>
            {(record.buy_profile)[0] == 1 ?
              <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/career`}>下载职业测评报告</a>
              : ''}
            {(record.buy_profile)[1] == 1 ?
              <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/via`}>下载优势测评报告</a>
              : ''}
            <span onClick={() => { history.push(`/user/detail/${record.userID}`) }} >
              查看详情
            </span>
          </div>
        )
      },
    },

  ]
  const tColumns = [
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
      render: (r) => (
        <span>{(r.buy_profile)[1] == 1 ? '已完成' : '未完成'}</span>
      )
    },
    {
      title: '职业测评',
      render: (r) => (
        <span>{(r.buy_profile)[0] == 1 ? '已完成' : '未完成'}</span>
      )
    },
    {
      title: '操作',
      render(record) {
        return (
          <div>
            {(record.buy_profile)[0] == 1 ?
              <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/career`}>下载职业测评报告</a>
              : ''}
            {(record.buy_profile)[1] == 1 ?
              <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/via`}>下载优势测评报告</a>
              : ''}
            <span onClick={() => { history.push(`/user/detail/${record.userID}`) }} >
              查看详情
            </span>
          </div>
        )
      },
    },

  ]
  return (
    <PageTitle router={app.router} title="班级详情">
      <Mcard title="基本信息">
        <Row>
          <EditableInput title="班级名称" bindName="class_name" value={detail.class_name} cb={editCallback} />
          <Col span={8}>班级编号：{detail.id}</Col>
          <Col span={8}>学校名称：{detail.school ? detail.school.school_name : ''}</Col>
          <Col span={8}>学校编码：{detail.school ? detail.school.school_code : ''}</Col>
          <Col span={8}>人数：{detail.class_person}</Col>
        </Row>
      </Mcard>
      <Mcard title="学生列表">
        <SelfDataTable columns={sColumns} url="ClassManage/listStudent" params={{ class_id: detail.id }} rowKey="id" />
      </Mcard>
      <Mcard title="教师列表">
        <SelfDataTable columns={tColumns} url="ClassManage/listTeacher" params={{ class_id: detail.id }} rowKey="id" />
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(ClassDetail)
