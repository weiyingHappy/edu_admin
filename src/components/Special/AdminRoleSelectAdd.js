// 获取所有网点列表的下拉选择框
import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Select } from 'antd'
import { connect } from 'dva'

class AdminRoleSelectAdd extends React.PureComponent {

  state = {
    roles: null,
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'app/componentRequest',
      uri: 'Admin/getAllRoleSelect',
      callback: (data) => {
        this.setState({ roles: data.results })
      },
    })
  }

  render() {
    const { roles } = this.state
    const { onChange } = this.props
    if (roles === null) {
      return <Spin />
    }

    return (
      <Select
        style={{ width: 200 }}
        defaultValue={'-1'}
        onChange={(value) => { onChange(value) }}
      >
        <Select.Option value={'-1'} key={'select_net_-1'}>请选择</Select.Option>
        {
          roles.map((item, index) => (
            <Select.Option value={item.id} key={`select_role_${index}`}>{item.name}</Select.Option>
          ))
        }
      </Select>
    )

  }
}

AdminRoleSelectAdd.propTypes = {
  onChange: PropTypes.func, //添加页面中,修改值后的回掉
}

export default connect(({ app }) => (app))(AdminRoleSelectAdd)
