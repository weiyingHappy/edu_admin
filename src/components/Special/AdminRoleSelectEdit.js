// 获取所有角色下拉选择框
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Spin, Select } from 'antd'
import { connect } from 'dva'
import styles from '../General/Editables/index.less'

class AdminRoleSelectEdit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      showEdit: false,
      initValue: props.defaultValue,
      nowValue: props.defaultValue,
      text: props.text,
      roles: null,
    }
  }

  initData() {
    this.props.dispatch({
      type: 'app/componentRequest',
      uri: 'Admin/getAllRoleSelect',
      callback: (data) => {
        this.setState({ roles: data.results })
      },
    })
  }

  render() {
    const { roles, edit } = this.state
    const { dispatch, app, loading, title, defaultValue, bindName, nocolon } = this.props

    if (edit) {
      // 在编辑状态
      if (roles === null) {
        return (
          <div className={styles.signleCenterRow}>
            <p>{title}{nocolon || '：'}</p>
            <span><Spin /></span>
          </div>
        )
      }

      return (
        <div className={styles.signleCenterRow}>
          <p>{title}{nocolon || '：'}</p>
          <Spin spinning={loading.effects[`${app.router.codeModel}/edit`] === true}>
            <Select
              className={styles.input}
              defaultValue={defaultValue}
              onChange={(value) => {
                this.setState({ nowValue: value })
              }}
            >
              {
                roles.map((role, index) => (
                  <Select.Option value={role.id} key={`select_net_${index}`}>{role.name}</Select.Option>
                ))
              }
            </Select>
            <p>
              <Icon
                type="check"
                onClick={() => {
                  const payload = {}
                  payload[bindName] = this.state.nowValue
                  dispatch({
                    type: `${app.router.codeModel}/edit`,
                    payload: { ...payload },
                    action: 'edit',
                    didAction: { type: 1 },
                  })
                }}
              />
            </p>
            <p>
              <Icon
                type="close"
                onClick={() => { this.setState({ edit: false, nowValue: this.state.initValue }) }}
              />
            </p>
          </Spin>
        </div>
      )
    }
    // 只显示文本和编辑按钮的状态
    return (
      <div
        className={styles.signleCenterRow}
        onMouseOver={() => { this.setState({ showEdit: true }) }}
        onMouseLeave={() => { this.setState({ showEdit: false }) }}
      >
        <p>{title}{nocolon || '：'}</p>
        <p>{this.state.text}</p>
        {
          this.state.showEdit ?
            <p>
              <Icon
                type="edit"
                onClick={() => {
                  this.setState({ edit: true })
                  if (roles === null) {
                    this.initData()
                  }
                }}
              />
            </p>
            : ''
        }
      </div>
    )
  }
}

AdminRoleSelectEdit.propTypes = {
  onChange: PropTypes.func, //添加页面中,修改值后的回掉
  text: PropTypes.string, //默认显示的文本
  title: PropTypes.string, // 编辑页面时的标签
  defaultValue: PropTypes.string, //编辑页面时的的默认值
  bindName: PropTypes.string, //编辑页面时绑定的字段名称
  nocolon: PropTypes.bool //是否显示“：”号
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(AdminRoleSelectEdit)
