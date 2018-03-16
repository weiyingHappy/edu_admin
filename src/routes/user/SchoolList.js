import React from 'react'
import { connect } from 'dva'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd } from '../../components/General'

function SchoolList({ dispatch, history, common, app }) {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '学校名称',
      dataIndex: 'school_name',
    },
    {
      title: '学校代码',
      dataIndex: 'school_code',
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

export default connect(mapStateToProps)(SchoolList)
