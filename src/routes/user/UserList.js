import React from 'react'
import { connect } from 'dva'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd } from '../../components/General'
import { covertUserType } from '../../utils/convert'

function UserList({ dispatch, history, common, app }) {

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
      title: '类型',
      render(record) {
        return covertUserType(record.role_id)
      },
    },
    {
      title: '是否购买评测',
      dataIndex: 'buy_profile',
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

export default connect(mapStateToProps)(UserList)
