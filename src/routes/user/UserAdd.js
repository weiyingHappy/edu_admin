import React from 'react'
import { Form, Input, Checkbox, message } from 'antd'
import { connect } from 'dva'
import { FAButton } from '../../components/General'
import { Mcard, PageTitle } from '../../layouts'
import { testType } from '../../utils/convert'

const FormItem = Form.Item
class UserAdd extends React.PureComponent {
  state = {
    phone: '',
    email: ''
  }
  render() {
    const { dispatch, loading, app, form } = this.props
    const { router } = app
    if (!app.init) {
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
      const state = this.state
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          console.log(state)
          if (!state.phone && !state.email) {
              message.error('请输入手机号或者邮箱')
              return
        }
        state.phone ? values.phone = state.phone : ''
        state.email ? values.email = state.email : ''
        dispatch({
          type: `${router.codeModel}/edit`,
          payload: { ...values },
          action: 'add',
          didAction: { type: 2 },
        })
    }
  })
}


return (
  <PageTitle router={router} title="新增账户">
    <Mcard>
      <Form onSubmit={handleSubmit}>

        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '请填入姓名' },
            ],
          })(
            <Input />,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="手机号" >
          <Input onChange={(e) => this.setState({ 'phone': e })}/>
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱" >
          <Input  />
        </FormItem>
        <FormItem {...formItemLayout} label="购买项目">
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: '请填入邮箱' },
            ],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              {testType.map((item) => {
                return <Checkbox value={item.value} key={item.value}>{item.name}</Checkbox>
              })}

            </Checkbox.Group>
            )}
        </FormItem>
        <FormItem {...tailformItemLayout}>
          <FAButton loading={loading.effects[`${router.codeModel}/edit`]} />
        </FormItem>
      </Form>
    </Mcard >
  </PageTitle >
)
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(Form.create()(UserAdd))
