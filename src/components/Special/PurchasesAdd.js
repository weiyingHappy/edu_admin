// 编辑角色权限
import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Checkbox, Row, Col } from 'antd'
import { connect } from 'dva'
import { testType } from '../../utils/convert'
import styles from './index.less'

class PurchasesAdd extends React.PureComponent {
  render() {
    const { onChange ,type = []} = this.props
    if (testType === null) {
      return <Spin />
    }
    return (
      <div>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            {
              testType.map((item) => {
                return <Col key={item.name} className={styles.checkbox} span={8} ><Checkbox value={item.value} disabled={ type.includes(item.value)}>{item.name}</Checkbox></Col>
              })
            }
          </Row>
        </Checkbox.Group>
      </div>
    )
  }
}

PurchasesAdd.propTypes = {
  onChange: PropTypes.func, //修改值后的回掉
}

export default connect(() => ({}))(PurchasesAdd)
