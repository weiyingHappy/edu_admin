import React from 'react'
import { Input, Button, message } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle } from '../../layouts'
import { EditMyNickName } from '../../components/Special'
import { EditableInput } from '../../components/General'

class My extends React.Component {
  state = {
    edit: false,
    oldpwd: null,
    newpwd: null,
    newpwd2: null,
  }
  render() {
    const { app, loading, dispatch } = this.props
    const { edit } = this.state
    const { user } = app

    const handleEditClick = () => {
      this.setState({ edit: !edit })
    }
    const handleCancelClick = () => {
      this.setState({ edit: false, oldpwd: null, newpwd: null, newpwd2: null })
    }
    const handleInputChange = (e, tag) => {
      if (tag === 'old') {
        this.setState({ oldpwd: e.target.value })
      } else if (tag === 'new') {
        this.setState({ newpwd: e.target.value })
      } else if (tag === 'new2') {
        this.setState({ newpwd2: e.target.value })
      }
    }

    const handleChangePwd = () => {
      if (this.state.oldpwd && this.state.newpwd && this.state.newpwd2) {
        if (this.state.newpwd === this.state.newpwd2) {
          dispatch({
            type: 'app/request',
            uri: `Admin/changePwd`,
            data: { oldpwd: this.state.oldpwd, newpwd: this.state.newpwd, newpwd2: this.state.newpwd2 },
            callback: (data) => {
              message.info('更新成功')
              this.setState({ edit: false, oldpwd: null, newpwd: null, newpwd2: null })
            },
          })
        } else {
          message.warn('两次输入的密码不一致')
        }
      } else {
        message.warn('请填写所有信息')
      }
    }

    return (
      <PageTitle nobread noback title="个人信息">
        <Mcard>
          <EditMyNickName title="昵称" value={user.name} noedit />
          <EditableInput title="电话" value={user.phone} noedit />
          <EditableInput title="角色" value={user.role ? user.role.name : ''} noedit />
          {/* <p>昵称：{user.name}</p>
          <p>电话：{user.phone}</p>
          <p>角色：{user.role ? user.role.name : ''}</p> */}
        </Mcard>
        <Mcard title="修改密码">
          <div style={{ marginBottom: 16, width: '30%' }}>
            <Input type="password" disabled={!edit} onChange={(e) => { handleInputChange(e, 'old') }} value={this.state.oldpwd} placeholder="旧密码" />
          </div>
          <div style={{ marginBottom: 16, width: '30%' }}>
            <Input type="password" disabled={!edit} onChange={(e) => { handleInputChange(e, 'new') }} value={this.state.newpwd} placeholder="新密码" />
          </div>
          <div style={{ marginBottom: 16, width: '30%' }}>
            <Input type="password" disabled={!edit} onChange={(e) => { handleInputChange(e, 'new2') }} value={this.state.newpwd2} placeholder="再次输入新密码" />
          </div>
          {
            edit ?
              <span>
                <Button style={{ marginRight: 20 }} onClick={handleCancelClick} >取消</Button>
                <Button
                  type="primary"
                  loading={loading.effects['app/request']}
                  onClick={handleChangePwd}
                >确定</Button>
              </span>
              :
              <Button onClick={handleEditClick}>修改</Button>
          }
        </Mcard>
      </PageTitle>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(My)
