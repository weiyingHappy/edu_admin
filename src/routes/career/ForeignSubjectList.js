import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, SearchInput, SAButton } from '../../components/General'

function InlandSubjectList({ dispatch, history, common, app }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '学科名称',
      dataIndex: 'name',
    },
    {
      title: '专业代码',
      dataIndex: 'id',
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
  const { search } = common
  return (
    <div>
      <Mcard>
        <Row>
          <Col span={12}>
            <SearchInput
              lable="学科名称"
              value={search.name}
              bindName="name"
            />
          </Col>
          <Col span={12}>
            <SearchInput
              lable="专业代码"
              value={search.id}
              bindName="id"
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
        {/* <AuthButtonAdd authId="101" history={history} /> */}
        <DataTable columns={columns} model={common} rowKey="id" />
      </Mcard>
    </div>
  )
}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(InlandSubjectList)
