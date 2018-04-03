import React from 'react'
import { Row, Col, Button, message } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
import { SelfDataTable, EditableInput } from '../../components/General'
import { AddBuyInfo } from '../../components/ModalToast'
import { apiPrefix } from '../../utils/utils'
// function ClassDetail({ common, app, loading, history }) {
class ClassDetail extends React.PureComponent {
  state = {
    visible: false
  }


  editCallback = () => {
    const { history, app, common } = this.props
    history.push(`/${app.router.model}/detail/${common.detail.id}`)
  }
  addStudent = () => {
    this.setState({
      visible: true
    })
  }
  toAddStu = (e) => {
    const { dispatch, common, app, history } = this.props
    const { detail } = common
    let msg = (!e.name) ? '请填写学生姓名' :
      (!e.phone) ? '请填写联系方式' :
        (!e.funcs || e.funcs.length < 1) ? '请确认购买项目' :
          !e.buy_type ? '请选择购买方式' :
            e.buy_type == 2 && !e.order_no ? '请填写订单号' :
              ''
    if (msg) {
      message.error(msg);
      return;
    }
    let tmp = Object.assign({}, e)
    if (e.funcs.includes('1')) {
      tmp['career'] = 1
    }
    if (e.funcs.includes('2')) {
      tmp['via'] = 1
    }
    tmp['class_id'] = detail.id
    delete tmp.funcs
    dispatch({
      type: 'app/request',
      uri: 'ClassManage/addStudent',
      data: { ...tmp },
      callback: ({ results }) => {
        this.setState({ visible: false })
        history.push(`/${app.router.model}/detail/${detail.id}`)
      },
    })
  }
  render() {
    const { history, app, common, loading } = this.props
    console.log('common', common)
    if (loading.effects[`${app.router.codeModel}/query`]) {
      return <MySpin />
    }
    if (!app.init) {
      return <Mcard><h1>404 Not Found</h1></Mcard>
    }
    // const { detail } = common
    const detail = common.detail ? common.detail : {}
    const sColumns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '账号',
        dataIndex: 'userID',
      },
      {
        title: '班级',
        dataIndex: 'class_name',
      },

      {
        title: '联系方式',
        render: (r) => (
          r.phone ? r.phone : r.email
        )
      },
      {
        title: '优势测评', //职业测评第一位，优势测评第二位
        render: (r) => (
          <span>{(r.get_profile)[1] == 1 ? '已完成' : '未完成'}</span>
        )
      },
      {
        title: '职业测评',
        render: (r) => (
          <span>{(r.get_profile)[0] == 1 ? '已完成' : '未完成'}</span>
        )
      },
      {
        title: '操作',
        render(record) {
          return (
            <div>
              {(record.get_profile)[0] == 1 ?
                <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/career`}>下载职业测评报告</a>
                : ''}
              {(record.get_profile)[1] == 1 ?
                <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/via`}>下载优势测评报告</a>
                : ''}
              <span onClick={() => { history.push(`/user/detail/${record.userID}`) }} >
                查看详情
            </span>
            </div>
          )
        },
      },

    ]
    const tColumns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '账号',
        dataIndex: 'userID',
      },
      {
        title: '班级',
        dataIndex: 'class_name',
      },

      {
        title: '联系方式',
        render: (r) => (
          r.phone ? r.phone : r.email
        )
      },
      {
        title: '优势测评',
        render: (r) => (
          <span>{(r.get_profile)[1] == 1 ? '已完成' : '未完成'}</span>
        )
      },
      {
        title: '职业测评',
        render: (r) => (
          <span>{(r.get_profile)[0] == 1 ? '已完成' : '未完成'}</span>
        )
      },
      {
        title: '操作',
        render(record) {
          return (
            <div>
              {(record.buy_profile)[0] == 1 ?
                <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/career`}>下载职业测评报告</a>
                : ''}
              {(record.buy_profile)[1] == 1 ?
                <a style={{ marginRight: '6px' }} target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${record.userID}/via`}>下载优势测评报告</a>
                : ''}
              <span onClick={() => { history.push(`/user/detail/${record.userID}`) }} >
                查看详情
            </span>
            </div>
          )
        },
      },

    ]
    return (

      <PageTitle router={app.router} title="班级详情">
        <Mcard title="基本信息">
          <Row>
            <EditableInput title="班级名称" bindName="class_name" value={detail.class_name} cb={this.editCallback} />
            <Col span={8}>班级编号：{detail.id}</Col>
            <Col span={8}>学校名称：{detail.school ? detail.school.school_name : ''}</Col>
            <Col span={8}>学校编码：{detail.school ? detail.school.school_code : ''}</Col>
            <Col span={8}>人数：{detail.class_person}</Col>
          </Row>
        </Mcard>
        <Mcard title="学生列表" extra={<Button type="primary" onClick={this.addStudent}>新增学生</Button>}>
          <SelfDataTable columns={sColumns} url="ClassManage/listStudent" params={{ class_id: detail.id }} rowKey="id" />
        </Mcard>
        <Mcard title="教师列表">
          <SelfDataTable columns={tColumns} url="ClassManage/listTeacher" params={{ class_id: detail.id }} rowKey="id" />
        </Mcard>
        <AddBuyInfo visible={this.state.visible} addContent="stu" title="新增学生" onCancel={() => { this.setState({ visible: false }) }} onCreate={this.toAddStu} />
      </PageTitle>
    )
  }
}
function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(ClassDetail)
