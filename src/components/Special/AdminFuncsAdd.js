// 编辑角色权限
import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Checkbox, Row, Col } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

class AdminFuncsAdd extends React.PureComponent {

  state = {
    funcs: null,
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'app/componentRequest',
      uri: `Admin/getAllFuncs`,
      callback: (data) => {
        this.setState({ funcs: data.results.funcs })
      },
    })
  }

  render() {
    const { funcs, } = this.state
    const { onChange } = this.props

    if (funcs === null) {
      return <Spin />
    }
    return (
      <div>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            {
              funcs.map((item) => {
                return <Col key={item.name} className={styles.checkbox} span={8}><Checkbox value={item.id}>{item.name}</Checkbox></Col>
              })
            }
          </Row>
        </Checkbox.Group>
      </div>
    )
  }
}

AdminFuncsAdd.propTypes = {
  onChange: PropTypes.func, //修改值后的回掉
}

export default connect(() => ({}))(AdminFuncsAdd)
