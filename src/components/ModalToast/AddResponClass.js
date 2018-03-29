import React from 'react'
import { Form, Modal, Select } from 'antd'
import { connect } from 'dva'
import { clearString } from '../../utils/convert'
const FormItem = Form.Item
const Option = Select.Option
class ChangeBuyType extends React.PureComponent {
  state = {
    scList: [],
    school_id: '',
    clasList: [],
    school_code: '',
    class_id: ''
  }
  handleFuncChange = (e) => {
    this.setState({ funcs: e })
  }
  doResetState = (e) => {
    this.setState({
      scList: [],
      school_id: '',
      clasList: [],
      school_code: '',
      class_id: ''
    })
    this.props.form.resetFields()
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'app/request',
      uri: "UserManage/listSchool",
      data: { school_name: "" },
      callback: (r) => {
        this.setState({
          scList: r.results
        })
      }
    })
  }
  handleChange = (e) => {
    const { scList } = this.state
    this.setState({
      school_id: e,
      school_code: scList.find(item => item.id == e).school_code
    })
    this.doSomeQuest(e)
  }

  handleSearch = (e) => {
    const { dispatch } = this.props
    dispatch({
      type: `app/request`,
      uri: `UserManage/listSchool`,
      data: { school_name: clearString(e) },
      callback: (r) => {

        this.setState({
          scList: r.results
        })
      }
    })
  }

  handleClassChange = (e) => {
    this.setState({
      class_id: e
    })
  }
  // 请求班级列表
  doSomeQuest = (school_id, class_name = "") => {
    const { dispatch } = this.props
    dispatch({
      type: `app/request`,
      uri: `UserManage/listClass`,
      data: { school_id: school_id, class_name: class_name },
      callback: (r) => {
        this.setState({
          clasList: r.results
        })
      }
    })
  }
  handleSearchClass = (e = "") => {
    const { school_id } = this.state
    this.doSomeQuest(school_id, e)
  }
  render() {
    const { form, title, visible, onCreate, onCancel } = this.props
    const { getFieldDecorator } = form
    const options = (this.state.scList || []).map(item => (
      <Option key={item.id} value={item.id}>{item.school_name}</Option>
    ))
    const clasOptions = (this.state.clasList || []).map(item => (
      <Option key={item.id} value={item.id}>{item.class_name}</Option>
    ))
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
            onCreate({ class_id: this.state.class_id })
            this.doResetState()
          }
          }
          onCancel={() => {
            this.doResetState()
            onCancel()
          }}
        >
          <FormItem {...formItemLayout} label="学校名称">
            {getFieldDecorator('school_name', {
              rules: [
                { required: true, message: '请填入学校名称' },
              ],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择学校"
                optionFilterProp="children"
                onChange={this.handleChange}
                onSearch={this.handleSearch}
              >
                {options}
              </Select>
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="学校编码">
            <span>{this.state.school_code}</span>
          </FormItem>
          {this.state.school_id ? <FormItem {...formItemLayout} label="班级名称">
            {getFieldDecorator('class_name', {
              rules: [
                { required: true, message: '请填入班级名称' },
              ],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请填入班级名称"
                optionFilterProp="children"
                onChange={this.handleClassChange}
                onSearch={this.handleSearchClass}
              >
                {clasOptions}
              </Select>
              )}
          </FormItem> : ''}

          <FormItem {...formItemLayout} label="班级编号">
            <span>{this.state.class_id}</span>
          </FormItem>
        </Modal>

      </div >
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, router: app.router }
}

export default connect(mapStateToProps)(Form.create()(ChangeBuyType))
