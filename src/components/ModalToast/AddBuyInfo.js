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
    order_no: '',
    name: '',
    phone: ''
  }
  handleFuncChange = (e) => {
    this.setState({ funcs: e })
  }
  render() {
    // 有addcontent,则是添加学生。没有则是添加购买信息
    const { title, visible, onCreate, onCancel, userInfo, type = [], addContent } = this.props
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
          onCancel={() => {
            this.setState({
              funcs: null,
              buy_type: '',
              order_no: '',
              name: ''
            })
            onCancel()
          }}
        >
          {addContent ? <FormItem {...formItemLayout} label="学生姓名"
          >
            <Input style={{ width: '200px' }} onChange={(e) => {
              this.setState({ 'name': e.target.value })
            }} />
          </FormItem> : ''}
          {addContent ? <FormItem {...formItemLayout} label="联系方式"
          >
            <Input style={{ width: '200px' }} onChange={(e) => {
              this.setState({ 'phone': e.target.value })
            }} />
          </FormItem> : ''}
          <FormItem {...formItemLayout} label="确认购买项目：">
            <PurchasesAdd type={type} onChange={this.handleFuncChange} />
          </FormItem>
          {userInfo ? <FormItem {...formItemLayout} label="确认购买信息：">
            <span>{userInfo.name}</span>&nbsp;&nbsp;<span>{userInfo.userID}</span>
          </FormItem> : ''}

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
