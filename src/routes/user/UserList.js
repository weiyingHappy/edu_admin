import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import {
  SAButton, SearchSelect, DataTable,
  SearchInput,
} from '../../components/General'

import { covertUserType, userType } from '../../utils/convert'
class UserList extends React.PureComponent {
  state = {
    selectedRowKeys: [],
    visible: false
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  onCreate = (e) => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/request',
      uri: 'UserManage/batchProfile',
      data: { user_id: this.state.selectedRowKeys, via: e.includes('1') ? 1 : 0, career: e.includes('2') ? 1 : 0 },
      callback: ({ results }) => {
        this.setState({ visible: false, selectedRowKeys: [] })
      },
    })
  }
  render() {
    const { dispatch, history, common, app } = this.props
    const { search } = common
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '账号',
        dataIndex: 'userID',
      },
      {
        title: '班级名称',
        dataIndex: 'class_name',
        render: (r) => (
          r ? r : '---'
        )
      },
      {
        title: '班级编号',
        render: (r) => (
          r.roles_id ==2 || r.roles_id ==3 ? r.class_id : '---'
        )
      },
      {
        title: '学校',
        dataIndex: 'school_name',
        render: (r) => (
          r ? r : '---'
        )
      },
      {
        title: '联系方式',
        render: (r) => (
          r.phone ? r.phone : r.email
        )
      },
      {
        title: '角色',
        render(record) {
          return covertUserType(record.roles_id)
        },
      },
      {
        title: '操作',
        render(record) {
          return (
            <div className={cs.tableAction}>
              <span onClick={() => { history.push(`/${app.router.model}/detail/${record.userID}`) }} >
                查看详情
              </span>
            </div>
          )
        },
      },
    ]
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
              <SearchInput
                lable="手机号"
                value={search.phone}
                bindName="phone"
              />
              <SearchInput
                lable="账号"
                value={search.userID}
                bindName="userID"
              />
              <SearchInput
                lable="班级名称"
                value={search.class_name}
                bindName="class_name"
              />
            </Col>
            <Col span={12}>

              <SearchSelect
                lable="角色"
                options={userType}
                value={search.roles_id}
                bindName="roles_id"
              />
              <SearchInput
                lable="学校"
                value={search.school_name}
                bindName="school_name"
              />
              <SearchInput
                lable="班级编号"
                value={search.class_id}
                bindName="class_id"
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
          {/* <ChangeBuyType visible={this.state.visible} title="修改购买项目" onShow={this.selectItem} onCreate={this.onCreate} onCancel={this.onCancel} >
            <Button type="primary">批量修改购买项目</Button>
          </ChangeBuyType>
          <p>已选择<span style={{color:'red'}}>{selectedRowKeys.length}</span>条数据</p>
          <SelectDataTable rowKey="id" rowSelection={rowSelection} columns={columns} model={common} />
          批量修改暂时不做
          */}
          <DataTable rowKey="id" columns={columns} model={common} />
        </Mcard>
      </div>
    )
  }
}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(UserList)
