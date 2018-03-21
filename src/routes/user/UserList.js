import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import {
  DataTable, AuthButtonAdd, SAButton, SearchSelect,
  ExportButton,
  SearchInput
} from '../../components/General'
import { covertUserType, userType } from '../../utils/convert'

function UserList({ dispatch, history, common, app }) {
  const { search } = common
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
      title: '联系方式',
      render: (r) => (
        r.phone ? r.phone : r.email
      )
    },
    {
      title: '类型',
      render(record) {
        return covertUserType(record.roles_id)
      },
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${app.router.model}/detail/${record.id}`) }} >
              查看详情
            </span>
          </div>
        )
      },
    },
  ]

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
              lable="账号"
              value={search.userID}
              bindName="userID"
            />
            <SearchInput
              lable="班级名称"
              value={search.class_name}
              bindName="class_name"
            />

          </Col>
          <Col span={12}>
            <SearchInput
              lable="账号"
              value={search.userID}
              bindName="userID"
            />
            <SearchSelect
              lable="角色"
              options={userType}
              value={search.roles_id}
              bindName="roles_id"
            />
             <SearchInput
              lable="学校"
              value={search.school_name}
              bindName="school_name"
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
        <AuthButtonAdd authId="101" history={history} />
        <DataTable columns={columns} model={common} rowKey="id" />
      </Mcard>
    </div>
  )
}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(UserList)
