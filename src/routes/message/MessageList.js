import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { wordsType, covertWordsType } from '../../utils/convert'
import { DataTable, SearchInput, SAButton, SearchSelect } from '../../components/General'

function MessageList({ dispatch, history, common, app }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '留言分类',
      render: (r) => (
        covertWordsType(r.type)
      )
    },
    {
      title: '留言内容',
      width:'200px',
      dataIndex: 'message',
      render:(text)=>(
        <p className={cs.textOver} style={{width:'200px'}}>{text}</p>
      )
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
              lable="姓名"
              value={search.name}
              bindName="name"
            />
            <SearchSelect
              lable="留言分类"
              options={wordsType}
              value={search.type}
              bindName="type"
            />
          </Col>
          <Col span={12}>
            <SearchInput
              lable="联系方式"
              value={search.phone}
              bindName="phone"
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

export default connect(mapStateToProps)(MessageList)
