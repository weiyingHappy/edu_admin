import React from 'react'
import { Icon, Spin, Input } from 'antd'
import { connect } from 'dva'
import styles from '../General/Editables/index.less'

class EditMyNickName extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      showEdit: false,
      initValue: '',
      nowValue: '',
    }
  }

  componentWillReceiveProps() {
    this.setState({ initValue: this.props.value, nowValue: this.props.value })
  }

  handleChange = () => {
    if (this.state.initValue == this.state.nowValue) {
      this.setState({ edit: false })
      return
    }
    const { dispatch } = this.props
    const payload = {}
    payload.name = this.state.nowValue
    dispatch({
      type: `app/componentRequest`,
      uri: 'Admin/changeMyNickName',
      data: { name: this.state.nowValue },
      callback: (data) => {
        this.setState({ edit: false, initValue: this.state.nowValue })
      },
    })
  }

  render() {
    const { loading, title, noedit, nocolon, textarea } = this.props
    if (this.state.edit) {
      return (
        <div className={styles.signleCenterRow}>
          <p>{title}{nocolon || '：'}</p>
          <Spin spinning={loading.effects['app/componentRequest'] === true}>
            <p className={styles.input}>
              {
                textarea ?
                  <Input.TextArea
                    autosize
                    style={{ width: '100%' }}
                    value={this.state.nowValue}
                    onChange={(e) => { this.setState({ nowValue: e.target.value }) }}
                  />
                  :
                  <Input
                    value={this.state.nowValue}
                    onChange={(e) => { this.setState({ nowValue: e.target.value }) }}
                  />
              }
            </p>
            <p>
              <Icon type="check" onClick={this.handleChange} />
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
    return (
      <div
        className={styles.signleCenterRow}
        onMouseOver={() => { this.setState({ showEdit: true }) }}
        onMouseLeave={() => { this.setState({ showEdit: false }) }}
      >
        <p>{title}{nocolon || '：'}</p>
        <p>{this.state.initValue}</p>
        {
          this.state.showEdit && noedit !== true ?
            <p>
              <Icon
                type="edit"
                onClick={() => { this.setState({ edit: true }) }}
              />
            </p>
            : ''
        }
      </div>
    )
  }
}

function mapStateToProps({ loading }) {
  return { loading }
}

export default connect(mapStateToProps)(EditMyNickName)
