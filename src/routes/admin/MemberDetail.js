import React from 'react'
import { connect } from 'dva'
import { EditableInput } from '../../components/General'
import { AdminRoleSelectEdit } from '../../components/Special'
import { Mcard, PageTitle, MySpin } from '../../layouts'

function MemberDetail({ common, app, loading }) {
  if (!app.init || !app.user.funcs.includes('1')) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common

  return (
    <PageTitle router={app.router} title="成员详情">
      <Mcard>
        <EditableInput title="成员名称" value={detail.name} bindName="name" />
        <EditableInput title="成员电话" value={detail.phone} bindName="phone" />
        <AdminRoleSelectEdit title="成员角色" text={detail.role.name} bindName="role_id" defaultValue={detail.role_id} />
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(MemberDetail)
