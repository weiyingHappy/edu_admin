import React from 'react'
import { connect } from 'dva'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd } from '../../components/General'

function RoleList({ dispatch, history, common, app }) {

  if (!app.init || !app.user.funcs.includes('2')) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

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

  return (
    <div>
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
