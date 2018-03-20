import React from 'react'
import { Form, Input, Select } from 'antd'
import { connect } from 'dva'
import { FAButton } from '../../components/General'
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

    const status = [
      {
        value: '1',
        name: '优势测评',
      },
      {
        value: '2',
        name: '职业测评',
      },

    ]
    return (
      <PageTitle router={router} title="新增账户">
        <Mcard>
          <Form onSubmit={handleSubmit}>

            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请填入角色名称' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="手机号">
              {getFieldDecorator('code', {
                rules: [
                  { required: true, message: '请填入角色编号' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="购买项目">
              {getFieldDecorator('code', {
                rules: [
                  { required: true, message: '购买项目' },
                ],
              })(
                <Select>
                  {status.map(item=>(
                    <Select.Option value={item.value}>{item.name}</Select.Option>
                  ))}
                </Select>
              )}
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
