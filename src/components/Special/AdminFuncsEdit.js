// 编辑角色权限
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spin, Checkbox, Row, Col } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

class AdminFuncsEdit extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      initValue: null,
      funcs: null,
      roleFuncs: null,
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'app/componentRequest',
      uri: `Admin/getAllFuncs/${this.props.roleId}`,
      callback: (data) => {
        this.setState({ funcs: data.results.funcs, roleFuncs: data.results.roleFuncs, initValue: data.results.roleFuncs })
      },
    })
  }

  render() {

    const { funcs, roleFuncs, edit } = this.state
    const { dispatch, loading } = this.props

    const handleEditClick = () => {
      this.setState({ edit: !edit })
    }
    const handleCancelClick = () => {
      this.setState({ edit: false, roleFuncs: this.state.initValue })
    }
    const onCheckgroupChange = (e) => {
      this.setState({ roleFuncs: e })
    }

    if (funcs === null) {
      return <Spin />
    }
    return (
      <div>
        <Checkbox.Group disabled={!edit} style={{ width: '100%' }} onChange={onCheckgroupChange} value={roleFuncs}>
          <Row>
            {
              funcs.map((item) => {
                return <Col key={item.name} className={styles.checkbox} span={8}><Checkbox value={item.id}>{item.name}</Checkbox></Col>
              })
            }
          </Row>
        </Checkbox.Group>
        <br />
        <br />
        {
          edit ?
            <span>
              <Button style={{ marginRight: 20 }} onClick={handleCancelClick} >取消</Button>
              <Button
                type="primary"
                loading={loading.effects['app/componentRequest']}
                onClick={() => {
                  dispatch({
                    type: 'app/componentRequest',
                    uri: `Admin/editRoleFunc`,
                    data: { roleId: this.props.roleId, roleFuncs: roleFuncs },
                    callback: (data) => {
                      this.setState({ edit: false, roleFuncs: roleFuncs, initValue: roleFuncs })
                    },
                  })
                }}
              >确定</Button>
            </span>
            :
            <Button onClick={handleEditClick}>修改</Button>
        }
      </div>
    )
  }
}

AdminFuncsEdit.propTypes = {
  roleId: PropTypes.string, //角色ID
}

function mapStateToProps({ app, loading }) {
  return { app, loading }
}

export default connect(mapStateToProps)(AdminFuncsEdit)
