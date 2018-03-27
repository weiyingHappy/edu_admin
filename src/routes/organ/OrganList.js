import React from 'react'
import { connect } from 'dva'
import { Row, Col, Button } from 'antd'
import Mcard from '../../layouts/Mcard'
import cs from '../app.less'
import { apiPrefix } from '../../utils/utils'
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
  exportAll = () => {
    const { common } = this.props
    const { search } = common

  }
  upExcel = () => {
    this.setState({
      upVisible: true
    })
  }
  formSubmit = (e) => {
    console.log(e)
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
    const url = `${apiPrefix()}/Admin/DownManage/batchOrgan`
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
          <form id="f1" ref="f1"
          // method="post" action={url} encType="multipart/form-data"
          >
            <input type="file" name="batch_organ" onChange={
              (e) => {
                console.log(e)
                this.setState({ batch_organ: e.target.value })
              }} />
            <input type="submit"
              onClick={(e) => {
                e.preventDefault()
                var fd = new FormData(document.querySelector('#f1'));
                // fd.append("batch_organ", this.state.batch_organ)
                console.log(e, this.refs.f1, fd)
                dispatch({
                  type: 'app/request',
                  uri: '/OrganManage/batchOrgan',
                  data: fd,
                  callback: ({ results }) => {
                    console.log('r', results)
                  },
                })
              }
              }
            />
          </form>

          <Button type="primary" onClick={() => this.exportAll}>全部导出</Button>
          <Button onClick={() => this.upExcel}>批量导入</Button>
          <SelectDataTable columns={columns} rowSelection={rowSelection} model={common} rowKey="id" />
          {/* <UpExcel title="选择excel文件" dispatch={dispatch} visible={this.state.upVisible} onCreate={this.formSubmit} onCancel={this.onCancel} /> */}
        </Mcard>
      </div>)
  }
}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(OrgantList)
