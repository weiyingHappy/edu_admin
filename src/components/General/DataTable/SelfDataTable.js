import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { connect } from 'dva'

// 指定一个接口地址，实现自我请求的表格控件
class SelfDataTable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      lists: null,
      nowPage: 1,
      count: 0,
    }
  }

  componentWillMount() {
    this.selfRequest()
  }

  selfRequest(page) {
    const { url, dispatch, params } = this.props
    console.log(url,params)
    let newParams = params
    if (!newParams) { newParams = {} }
    if (!newParams.page) { newParams.page = page || this.state.nowPage }
    dispatch({
      type: 'app/request',
      uri: url,
      data: newParams,
      callback: ({ results }) => {
        this.setState({ lists: results.lists, nowPage: results.nowPage, count: results.count })
      },
    })
  }

  render() {
    const { loading, columns, rowKey } = this.props
    const { lists, nowPage, count } = this.state
    return (
      <Table
        columns={columns}
        dataSource={lists}
        rowKey={record => record[rowKey || 'id']}
        loading={loading.effects['app/request']}
        pagination={{
          current: nowPage,
          total: count,
          showTotal: total => `共 ${total} 条`,
          onChange: p => this.selfRequest(p),
        }}
      />
    )
  }
}


function mapStateToProps({ app, loading }) {
  return { loading, app }
}

SelfDataTable.propTypes = {
  columns: PropTypes.array, //要显示的列内容
  url: PropTypes.string, //要请求的地址
  params: PropTypes.object //每次查询需要的额外参数
}

export default connect(mapStateToProps)(SelfDataTable)
