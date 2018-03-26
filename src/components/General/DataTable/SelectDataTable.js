import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'

function SelectDataTable({ dispatch, loading, router, columns, model, rowKey, rowSelection }) {
  return (
    <Table
      columns={columns}
      dataSource={model.lists}
      rowKey={record => record[rowKey || 'id']}
      rowSelection={rowSelection}
      loading={loading.effects[`${router.codeModel}/query`] || loading.effects[`${router.codeModel}/edit`]}
      pagination={{
        current: model.nowPage,
        total: model.count,
        showTotal: total => `共 ${total} 条`,
        onChange: (p) => {
          dispatch({
            type: `${router.codeModel}/query`,
            payload: { page: p },
            source: 'page',
          })
        },
      }}
    />
  )
}

function mapStateToProps({ app, loading }) {
  return { loading, router: app.router }
}

export default connect(mapStateToProps)(SelectDataTable)
