import React from 'react'
import { connect } from 'dva'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd } from '../../components/General'

function ClassList({ dispatch, history, common, app }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '班级名称',
      dataIndex: 'class_name',
    },
    {
      title: '学校',
      dataIndex: 'school_name',
    },
    {
      title: '账号',
      dataIndex: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '班级人数',
      dataIndex: 'persons',
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

export default connect(mapStateToProps)(ClassList)
