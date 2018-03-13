import React from 'react'
import { connect } from 'dva'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd } from '../../components/General'

function StudentList({ dispatch, history, common, app }) {

  if (!app.init || !app.user.funcs.includes('1')) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '编号12',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      render(record) {
        return record.role.name
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

export default connect(mapStateToProps)(StudentList)
