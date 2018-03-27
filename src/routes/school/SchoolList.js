import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, AuthButtonAdd, SAButton, SearchInput } from '../../components/General'

function SchoolList({ dispatch, history, common, app }) {
  const { search } = common
  const columns = [
    {
      title: '学校名称',
      dataIndex: 'school_name',
    },
    {
      title: '学校编码',
      dataIndex: 'school_code',
    },
  ]

  return (
    <div>
      <Mcard >
        <Row>
          <Col span={12}>
            <SearchInput
              lable="学校编码"
              value={search.school_code}
              bindName="school_code"
            />
          </Col>
          <Col span={12}>
            <SearchInput
              lable="学校名称"
              value={search.school_name}
              bindName="school_name"
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

export default connect(mapStateToProps)(SchoolList)
