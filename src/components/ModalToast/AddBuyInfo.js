//新增购买信息
import React from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { connect } from 'dva'
import { PurchasesAdd } from '../../components/Special'
import { buyType } from '../../utils/convert'
const FormItem = Form.Item
const Option = Select.Option
class ChangeBuyType extends React.PureComponent {
  state = {
    funcs: null,
    buy_type: '',
    order_no: ''
  }
  handleFuncChange = (e) => {
    this.setState({ funcs: e })
  }
  render() {
    const { title,  visible, onCreate, onCancel, userInfo } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      hasFeedback: true,
    }
    return (
      <div>

        <Modal title={title}
          okText="确认"
          cancelText="取消"
          visible={visible}
          onOk={() => {
            onCreate(this.state)
           }
          }
          onCancel={onCancel}
        >
          <FormItem {...formItemLayout} label="确认购买项目：">
            <PurchasesAdd type={userInfo.order} onChange={this.handleFuncChange} />
          </FormItem>
          <FormItem {...formItemLayout} label="确认购买信息：">
            <span>{userInfo.name}</span>&nbsp;&nbsp;<span>{userInfo.userID}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="购买方式：">
            <Select
              onChange={(value) => {
                this.setState({ 'buy_type': value })
              }}
              style={{ width: '200px' }}
            >
              {(buyType || []).map((item) => {
                return (
                  <Option value={`${item.value}`} key={`${item.value}`}>
                    {item.name}
                  </Option>
                )
              }
              )}
            </Select>
          </FormItem>
          {this.state.buy_type == 2 ?
            <FormItem {...formItemLayout} label="订单号："
            >
              <Input style={{ width: '200px' }} onChange={(e) => {
                this.setState({ 'order_no': e.target.value })
              }} />
            </FormItem> : ''
          }

        </Modal>

      </div>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(Form.create()(ChangeBuyType))
