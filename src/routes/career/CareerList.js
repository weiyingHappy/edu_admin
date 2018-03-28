import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import { DataTable, SearchInput, SAButton } from '../../components/General'
import cs from '../app.less'
function CareerList({ dispatch, history, common, app }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '职业名称',
      dataIndex: 'name',
    },
    {
      title: '职业编号',
      dataIndex: 'code',
    },
    {
      title: '教育水平等级',
      dataIndex: 'edu_level',
    },
    {
      title: '行业',
      dataIndex: 'industry',
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

          </Col>
          <Col span={12}>
            <SearchInput
              lable="职业编号"
              value={search.class_id}
              bindName="class_id"
            />
             <SearchInput
              lable="行业"
              value={search.industry}
              bindName="industry"
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

export default connect(mapStateToProps)(CareerList)
