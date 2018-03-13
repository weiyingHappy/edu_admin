import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

function AuthButtonAdd({ history, authId, app }) {

  if (app.init && app.user.funcs.includes(authId)) {
    return (
      <Button
        icon="plus"
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => { history.push(`/${app.router.model}/add/1`) }}
      >添加</Button>
    )
  }
  return null
}

function mapStateToProps({ app }) {
  return { app }
}

export default connect(mapStateToProps)(AuthButtonAdd)
