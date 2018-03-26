import React from 'react'
import { Form, Modal } from 'antd'
import { connect } from 'dva'
import { PurchasesAdd } from '../../components/Special'

const FormItem = Form.Item
class ChangeBuyType extends React.PureComponent {
  state = {
    funcs: null,
  }
  handleFuncChange = (e) => {
    console.log(e, 11111111)
    this.setState({ funcs: e })
  }
  render() {
    const { title, onShow, children, visible, onCreate,onCancel } = this.props
    const { funcs } = this.state
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 16 },
      hasFeedback: true,
    }

    return (
      <div>
        <span onClick={onShow}>{children}</span>
        <Modal title={title}
          okText="确认"
          cancelText="取消"
          visible={visible}
          onOk={() => onCreate(funcs)}
          onCancel={()=> onCancel()}
        >
          <FormItem {...formItemLayout} label="修改此部分用户购买项目为：">
            <PurchasesAdd onChange={this.handleFuncChange} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(Form.create()(ChangeBuyType))
