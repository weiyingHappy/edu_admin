import React from 'react'
import { Form, Input } from 'antd'
import { connect } from 'dva'
import { FAButton } from '../../components/General'
import { Mcard, PageTitle } from '../../layouts'

const FormItem = Form.Item
class SchoolAdd extends React.PureComponent {
  state = {
    role_id: null,
  }
  render() {
    const { dispatch, loading, app, form } = this.props

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
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: `${app.router.codeModel}/edit`,
            payload: { ...values },
            action: 'add',
            didAction: { type: 2 },
          })
        }
      })
    }

    return (
      <PageTitle router={app.router} title="添加学校">
        <Mcard>
          <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="学校名称">
              {getFieldDecorator('school_name', {
                rules: [
                  { required: true, message: '请填入学校名称' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="学校代码">
              {getFieldDecorator('school_code', {
                rules: [
                  { required: true, message: '请填入学校代码' },
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

export default connect(mapStateToProps)(Form.create()(SchoolAdd))
