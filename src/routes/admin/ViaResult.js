import React from 'react'
import { connect } from 'dva'
import style from './index.less'

class CareeResult extends React.Component {
  state = {
    results: null,
    HLD: [],
    listIndustry: [],
    level: [1, 5],
    stem: '-1',
    lists: [],
    industry: '-1'
  }
  componentWillMount() {
    const { dispatch, location } = this.props
    const { pathname } = location
    const parm = pathname.split('/')
    const uri = `ReportManage/${parm[2]}/${parm[3]}`
    dispatch({
      type: 'app/request',
      uri: uri,
      callback: ({ results }) => {

        this.setState({
          results: results
        })
      }
    })
  }
  render() {
    const { results } = this.state
    return (
      <div className={style.report}>
        <div className={style.case}>
          <h1 className={style.title}>
            <span>优势测评结果</span>
          </h1>

        </div>
      </div>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(CareeResult)
