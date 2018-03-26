import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd , SAButton,SearchSelect,
  ExportButton,
  SearchInput} from '../../components/General'

function RoleList({ dispatch, history, common, app }) {

  if (!app.init ) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }
  const { search } = common
  console.log(search,common)
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '代码',
      dataIndex: 'code',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span
              onClick={() => {
                history.push(`/${app.router.model}/detail/${record.id}`)
              }}
            >
              查看详情
            </span>
          </div>
        )
      },
    },
  ]
  const status = [
    {
      value: '1',
      name: '老师',
    },
    {
      value: '2',
      name: '学生',
    },
    {
      value: '3',
      name: '家长',
    },
    {
      value: '4',
      name: '游客',
    },
  ]
  return (
    <div>
      <Mcard>
        <Row>
          <Col span={12}>
            <SearchInput
              lable="姓名"
              value={search.order_no}
              bindName="order_no"
            />
            <SearchInput
              lable="邮箱"
              value={search.order_no}
              bindName="order_no"
            />
          </Col>
          <Col span={12}>
            <SearchInput
              lable="账号"
              value={search.order_no}
              bindName="order_no"
            />
           <SearchSelect
              lable="角色"
              options={status}
              value={search.status}
              bindName="status"
            />
          </Col>
         <Col>
            <SAButton
              dispatch={dispatch}
              model={app.router.codeModel}
              search={search}
            />
            <ExportButton marginLeft={40} state={common} />
          </Col>
        </Row>
      </Mcard>
      <Mcard >
        <AuthButtonAdd authId="102" history={history} />
        <DataTable columns={columns} model={common} rowKey="id" />
      </Mcard>
    </div>
  )
}

function mapStateToProps({ app, common }) {
  return { app, common }
}

export default connect(mapStateToProps)(RoleList)
