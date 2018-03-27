import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { DataTable, SearchInput, SAButton } from '../../components/General'

function ClassList({ dispatch, history, common, app }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '职业名称',
      dataIndex: 'class_name',
    },
    {
      title: '职业编号',
      dataIndex: 'school_name',
    },
    {
      title: '教育水平等级',
      dataIndex: 'id',
    },
    {
      title: '行业',
      dataIndex: 'create_time',
    },
    {
      title: '职业评级',
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
  const { search } = common
  return (
    <div>
      <Mcard>
        <Row>
          <Col span={12}>
            <SearchInput
              lable="职业名称"
              value={search.class_name}
              bindName="class_name"
            />
            <SearchInput
              lable="职业区域"
              value={search.class_name}
              bindName="class_name"
            />
            <SearchInput
              lable="学校"
              value={search.class_name}
              bindName="class_name"
            />
          </Col>
          <Col span={12}>
            <SearchInput
              lable="职业编号"
              value={search.class_id}
              bindName="class_id"
            />
             <SearchInput
              lable="行业"
              value={search.class_name}
              bindName="class_name"
            />
             <SearchInput
              lable="班级编号"
              value={search.class_name}
              bindName="class_name"
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

export default connect(mapStateToProps)(ClassList)
