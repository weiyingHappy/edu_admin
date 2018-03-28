import React from 'react'
import { connect } from 'dva'
import { Row, Col, Button, message } from 'antd'
import Mcard from '../../layouts/Mcard'
import { SelectDataTable, SearchInput, SAButton } from '../../components/General'
import { UpExcel } from '../../components/ModalToast'
class OrgantList extends React.PureComponent {

  // if (!app.init) {
  //   return <Mcard><h1>404 Not Found</h1></Mcard>
  // }
  state = {
    selectedRowKeys: [],
    visible: false,
    batch_organ: null,
    upVisible: false
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  someExport = (type = 1) => {
    // type:1 =>批量导出
    // type:2 =>部分导出
    const { common, dispatch } = this.props
    const { search } = common
    let data = { page: 1 }
    if (type == 1) {
      if (!this.state.selectedRowKeys.length) {
        message.error('请选择项目')
        return
      }
      data.id = this.state.selectedRowKeys
    }
    if (type == 2) {
      Object.assign(data, search)
    }
    dispatch({
      type: 'app/request',
      uri: '/OrganManage/exportOrgan',
      data: data,
      callback: ({ results }) => {
        console.log(results)
      }
    })

  }
  upExcel = () => {
    this.setState({
      upVisible: true
    })
  }
  formSubmit = (e) => {
    console.log(e)
    const { dispatch } = this.props
    var fd = new FormData(document.querySelector('#form'));
    dispatch({
      type: 'app/request',
      uri: '/OrganManage/batchOrgan',
      data: fd,
      callback: ({ results }) => {
        this.setState({
          upVisible: false
        })
      },
    })
  }
  onCancel = () => {
    this.setState({
      upVisible: false
    })
  }
  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { common, app, dispatch } = this.props
    const columns = [
      {
        title: '合同编号',
        dataIndex: 'contract_no',
      },
      {
        title: '客户名称',
        dataIndex: 'organ_name',
      },
      {
        title: '省份',
        dataIndex: 'province',
      },
      {
        title: '城市',
        dataIndex: 'city',
      },
      {
        title: '渠道类型',
        dataIndex: 'distribution_type',
      },
      {
        title: '渠道商名称',
        dataIndex: 'distributor_name',
      }
    ]
    const { search } = common
    return (
      <div>
        <Mcard>
          <Row>
            <Col span={12}>
              <SearchInput
                lable="合同编号"
                value={search.contract_no}
                bindName="contract_no"
              />
              <SearchInput
                lable="渠道类型"
                value={search.distribution_type}
                bindName="distribution_type"
              />
              <SearchInput
                lable="省份"
                value={search.province}
                bindName="province"
              />
            </Col>
            <Col span={12}>
              <SearchInput
                lable="客户名称"
                value={search.organ_name}
                bindName="organ_name"
              />
              <SearchInput
                lable="渠道商名称"
                value={search.distributor_name}
                bindName="distributor_name"
              />
              <SearchInput
                lable="城市"
                value={search.city}
                bindName="city"
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
          <Button onClick={this.upExcel}>批量导入</Button>
          <Button onClick={() => this.someExport("1")} style={{margin:'0 6px'}}>批量导出</Button>
          <Button type="primary" onClick={() => this.someExport("2")}>全部导出</Button>
          <p>已选择<span style={{color:'red'}}>{selectedRowKeys.length}</span>条数据</p>
          <SelectDataTable columns={columns} rowSelection={rowSelection} model={common} rowKey="id" />
          <UpExcel title="选择excel文件" dispatch={dispatch} uri="/OrganManage/batchOrgan" visible={this.state.upVisible} onCreate={this.formSubmit} onCancel={this.onCancel} />
        </Mcard>
      </div>)
  }
}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(OrgantList)
