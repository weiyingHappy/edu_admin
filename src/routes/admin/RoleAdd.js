import React from 'react'
import { Form, Input } from 'antd'
import { connect } from 'dva'
import { FAButton } from '../../components/General'
import { AdminFuncsAdd } from '../../components/Special'
import { Mcard, PageTitle } from '../../layouts'

const FormItem = Form.Item
class RoleAdd extends React.PureComponent {
  state = {
    funcs: null,
  }
  render() {
    const { dispatch, loading, app, form } = this.props
    const { router } = app
    if (!app.init || !app.user.funcs.includes('102')) {
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
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: `${router.codeModel}/edit`,
            payload: { ...values, funcs: this.state.funcs },
            action: 'add',
            didAction: { type: 2 },
          })
        }
      })
    }

    const handleFuncChange = (e) => {
      this.setState({ funcs: e })
    }

    return (
      <PageTitle router={router} title="添加角色">
        <Mcard>
          <Form onSubmit={handleSubmit}>

            <FormItem {...formItemLayout} label="角色名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请填入角色名称' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="角色编号">
              {getFieldDecorator('code', {
                rules: [
                  { required: true, message: '请填入角色编号' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="角色权限">
              <AdminFuncsAdd onChange={handleFuncChange} />
            </FormItem>

            <FormItem {...tailformItemLayout}>
              <FAButton loading={loading.effects[`${router.codeModel}/edit`]} />
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

export default connect(mapStateToProps)(Form.create()(RoleAdd))
