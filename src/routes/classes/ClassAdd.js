import React from 'react'
import { Form, Input, message } from 'antd'
import { connect } from 'dva'
import { FAButton } from '../../components/General'
import { AdminRoleSelectAdd } from '../../components/Special'
import { Mcard, PageTitle } from '../../layouts'

const FormItem = Form.Item
class ClassAdd extends React.PureComponent {
  state = {
    role_id: null,
  }
  render() {
    const { dispatch, loading, app, form } = this.props

    if (!app.init || !app.user.funcs.includes('101')) {
      return <Mcard><h1>404 Not Found</h1></Mcard>
    }

    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
      hasFeedback: true,
    }

    const tailformItemLayout = {
      wrapperCol: { span: 8, offset: 2 },
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.role_id === null || this.state.role_id === '-1') {
        message.error('请选择角色')
        return
      }
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: `${app.router.codeModel}/edit`,
            payload: { ...values, role_id: this.state.role_id },
            action: 'add',
            didAction: { type: 2 },
          })
        }
      })
    }

    return (
      <PageTitle router={app.router} title="添加成员">
        <Mcard>
          <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="角色名称">
              {getFieldDecorator('role_id', {
                rules: [
                  { required: true, message: '请选择角色' },
                ],
              })(
                <AdminRoleSelectAdd onAdd onChange={(value) => { this.setState({ role_id: value }) }} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请填入姓名' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请填入电话' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...tailformItemLayout}>
              <FAButton loading={loading.effects[`${app.router.codeModel}/edit`]} />
            </FormItem>
          </Form>
        </Mcard>
      </PageTitle>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(Form.create()(ClassAdd))
