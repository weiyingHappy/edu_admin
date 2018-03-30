import React from 'react'
import { Row, Col, Card, Button, message, Popconfirm, Progress } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
import { AddResponClass, AddBuyInfo } from '../../components/ModalToast'
import { covertUserType, covertBuyType, testType } from '../../utils/convert'
import { apiPrefix } from '../../utils/utils'

class UserDetail extends React.PureComponent {

  state = {
    visible: false,
    buyvisible: false,
    type: []
  }
  componentWillMount() {
    const { app, loading } = this.props
    if (!app.init) {
      return <Mcard><h1>404 Not Found</h1></Mcard>
    }
    if (loading.effects[`${app.router.codeModel}/query`]) {
      return <MySpin />
    }
  }
  addClass = () => {
    this.setState({
      visible: true
    })
  }
  addBuyInfo = () => {
    const { common } = this.props
    const { detail } = common
    let type = []
    let obj = detail ? detail.order : {}
    for (var key in obj) {
      type.push(key == 'career' ? '1' : key == 'via' ? '2' : '')
    }
    this.setState({
      buyvisible: true,
      type: type
    })
  }

  //选择班级
  onCreate = (e) => {
    console.log('添加班级', e)
    const { dispatch, common, app, history } = this.props
    const { detail } = common
    dispatch({
      type: 'app/request',
      uri: 'UserManage/editTeacherClass',
      data: { user_id: detail.id, add_class_id: e.class_id },
      callback: ({ results }) => {
        this.setState({ visible: false })
        history.push(`/${app.router.model}/detail/${detail.userID}`)
      },
    })
  }
  //验证购买信息
  onCreateBuy = (e) => {
    console.log('购买信息', e)
    const { dispatch, common, app, history } = this.props
    const { detail } = common
    let msg = (!e.funcs || e.funcs.length < 1) ? '请确认购买项目' : !e.buy_type ? '请选择购买方式' : e.buy_type == 2 && !e.order_no ? '请填写订单号' : ''
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
    tmp['userID'] = detail.userID
    delete tmp.funcs
    dispatch({
      type: 'app/request',
      uri: 'UserManage/editAssessment',
      data: { ...tmp },
      callback: ({ results }) => {
        this.setState({ buyvisible: false })
        history.push(`/${app.router.model}/detail/${detail.userID}`)
      },
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  onCancelBuy = (e) => {
    this.setState({
      buyvisible: false
    })
  }

  lookReport = (e, uid) => {
    let a = document.createElement('a')
    a.setAttribute('href', `/edu_admin/#/testresult/${e}/${uid}`)
    a.click()

  }
  //重组下数据
  parseBuyInfo = (e) => {
    const { common } = this.props
    const { detail } = common
    let arr = []
    let obj = detail && detail.order || {}
    for (var key in obj) {
      let tmp = {}
      tmp = JSON.parse(JSON.stringify(obj[key]))
      tmp.msg = key == 'via' ? '优势测评' : key == 'career' ? '职业测评' : ''
      tmp.test = key == 'career' ? '1' : key == 'via' ? '2' : '' //增加一个字段test，代表测评类型
      arr.push(tmp)
    }
    return arr
  }
  render() {
    const { common, app } = this.props
    const { detail } = common
    const tArr = this.parseBuyInfo()
    const getBuyInfo = tArr.length ? tArr.map(item =>
      <Card style={{ marginBottom: '6px' }} key={item.msg} title={item.msg}
      // extra={<Popconfirm placement="topLeft" title={"确认移除吗"} onConfirm={() => {
      //   let data = {}
      //   data.userID = detail.userID
      //   item.test == 1 ? data.del_via = 0 : item.test == 2 ? data.del_career = 0 : '' //根据测评类型控制传的参数字段名
      //   dispatch({
      //     type: 'app/request',
      //     uri: 'UserManage/editAssessment',
      //     data: { ...data },
      //     callback: ({ results }) => {
      //       history.push(`/${app.router.model}/detail/${detail.userID}`)
      //     },
      //   })
      // }} okText="确定" cancelText="取消">
      //   <Button>移除购买</Button>
      // </Popconfirm>}
      >
        <Row>
          <Col span={8}>购买方式：{covertBuyType(item.buy_type)}</Col>
          {item.buy_type == 2 ? <Col span={8}>订单号：{item.order_no}</Col> : ''}
          {item.buy_type == 2 ? <Col span={8}>购买时间：{item.create_time}</Col> : ''}
        </Row>
      </Card>
    ) : <span>暂无信息</span>
    return (
      detail ?
        <PageTitle router={app.router} title="账户详情">
          <Mcard title="基本信息">
            <Row>
              <Col span={8}>账号：{detail.userID}</Col>
              <Col span={8}>姓名：{detail.name}</Col>
              <Col span={8}>手机：{detail.phone}</Col>
              <Col span={8}>角色：{covertUserType(detail.roles_id)}</Col>

            </Row>
            {/* <EditableSelect title="角色" defaultValue={detail.roles_id} bindName="roles_id" selects={userType} /> */}
          </Mcard>
          {detail.roles_id == 3 ?
            <Mcard title="学校信息" extra={<Button type="primary" onClick={this.addClass}>新增负责班级</Button>}>
              {detail.class ? (detail.class || []).map(item => (
                <Card key={item.id} style={{ marginBottom: '6px' }}>
                  <Row>
                    <Col span={8}>学校名称：{item.school_name}</Col>
                    <Col span={8}>学校编号：{item.school_code}</Col>
                    <Col span={8}>班级：{item.class_name}</Col>
                    <Col span={8}>班级编号：{item.id}</Col>
                  </Row>
                </Card>
              )) : '暂无信息'}
            </Mcard> : ''
          }
          {detail.roles_id == 2 ?
            <Mcard title="学校信息" >
              {detail.student_class ? <Card key={detail.student_class.id} style={{ marginBottom: '6px' }}>
                <Row>
                  <Col span={8}>学校名称：{detail.student_class.school_name}</Col>
                  <Col span={8}>学校编号：{detail.student_class.school_code}</Col>
                  <Col span={8}>班级：{detail.student_class.class_name}</Col>
                  <Col span={8}>班级编号：{detail.student_class.id}</Col>
                </Row>
              </Card> : '暂无信息'}

            </Mcard> : ''
          }

          <Mcard title="购买信息" extra={this.parseBuyInfo().length < testType.length ? <Button type="primary" onClick={this.addBuyInfo} >新增购买信息</Button> : false}>
            {getBuyInfo}
          </Mcard>
          {/* 优势测评，青年100道题，成人120道 */}
          {detail.answers ?
            <Mcard title="测评信息">
              {detail.answers.length ?
                (detail.answers || []).map(item => (
                  <Card key={item.type} title={item.type == 2 ? '优势测评' : '职业测评'}
                    style={{ marginBottom: '6px' }}
                    extra={<div>
                      <Button
                        type="primary"
                        style={{ marginRight: '6px' }}
                        onClick={() => this.lookReport(item.type == 1 ? 'onlineCareer' : 'onlineVia', detail.userID)}
                        disabled={(item.count / (item.type == 2 ? (detail.roles_id == 2 ? 100 : 120) : 180)) == 1 ? false : true}>
                        查看测评报告
                      </Button>
                      {(item.count / (item.type == 2 ? (detail.roles_id == 2 ? 100 : 120) : 180)) == 1 ? <a target="_blank" href={`${apiPrefix()}/Admin/DownManage/downloadProfile/${app.user.token}/${detail.userID}/${item.type == 2 ? 'via' : 'career'}`}>下载报告</a> : <span>测评未完成</span>}
                    </div>}>
                    <Row>
                      <Col span={8}>已完成：{item.count}道题目</Col>
                      <Col span={8}>测试进度：<Progress style={{ width: '120px' }} percent={(item.count / (item.type == 2 ? (detail.roles_id == 2 ? 100 : 120) : 180)).toFixed(2) * 100} size="small" /></Col>
                      <Col span={8}>最近测试时间：{item.last_modify_time}</Col>
                    </Row>
                  </Card>
                )) : '暂无信息'}
            </Mcard> : ''}

          {detail.roles_id == 2 ?
            <Mcard title="家属信息">
              {detail.parent ? <Row>
                <Col span={8}>账号：{detail.parent.userID}</Col>
                <Col span={8}>手机：{detail.parent.phone}</Col>
                <Col span={8}>姓名：{detail.parent.name}</Col>
                <Col span={8}>角色：{covertUserType(detail.parent.roles_id)}</Col>
              </Row> : '暂无信息'}
            </Mcard> : ''}
          <AddResponClass visible={this.state.visible} onCancel={this.onCancel} onCreate={this.onCreate} />
          <AddBuyInfo visible={this.state.buyvisible} onCancel={this.onCancelBuy} userInfo={detail} type={this.state.type} onCreate={this.onCreateBuy} />
        </PageTitle>
        : ''
    )
  }

}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(UserDetail)
