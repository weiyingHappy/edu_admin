import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, SearchInput, SAButton } from '../../components/General'

function StudentList({ dispatch, history, common, app }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '账号',
      dataIndex: 'userID',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '班级名称',
      dataIndex: 'class_name',
    },
    {
      title: '班级编号',
      dataIndex: 'class_id',
    },
    {
      title: '学校',
      dataIndex: 'school_name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            {/* <span onClick={() => { history.push(`/${app.router.model}/detail/${record.id}`) }} >
              查看详情
            </span> */}
            <span onClick={() => { history.push(`/user/detail/${record.id}`) }} >
              查看详情
            </span>
          </div>
        )
      },
    },
  ]
  const { search } = common
  return (
    <div>
      <Mcard>
        <Row>
          <Col span={12}>
            <SearchInput
              lable="姓名"
              value={search.name}
              bindName="name"
            />
            <SearchInput
              lable="邮箱"
              value={search.email}
              bindName="email"
            />
            <SearchInput
              lable="手机号"
              value={search.phone}
              bindName="phone"
            />
             <SearchInput
              lable="学校"
              value={search.school_name}
              bindName="school_name"
            />
          </Col>
          <Col span={12}>
            <SearchInput
              lable="账号"
              value={search.userID}
              bindName="userID"
            />
           <SearchInput
              lable="班级名称"
              value={search.class_name}
              bindName="class_name"
            />
            <SearchInput
              lable="班级编号"
              value={search.class_id}
              bindName="class_id"
            />
            <SAButton
              dispatch={dispatch}
              model={app.router.codeModel}
              search={search}
            />
          </Col>
        </Row>
      </Mcard>
      <Mcard >
        <DataTable columns={columns} model={common} rowKey="id" />
      </Mcard>
    </div>
  )
}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(StudentList)
