import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import Mcard from '../../layouts/Mcard'
import { DataTable, SearchInput, SAButton, SearchSelect } from '../../components/General'
import { levelType } from '../../utils/convert'
import cs from '../app.less'
class CareerList extends React.PureComponent {
  state = {
    industryList: [
      {
        value: '-1',
        name: '全部'
      }
    ]
  }
  componentWillMount() {
    const { app } = this.props
    this.getIndusty()
    if (!app.init) {
      return <Mcard><h1>404 Not Found</h1></Mcard>
    }

    //this.getIndusty()
  }

  getIndusty = () => {
    const { dispatch } = this.props
    const { industryList } = this.state
    dispatch({
      type: 'app/request',
      uri: '/CareerManage/listIndustry',
      callback: ({ results }) => {
        const indus = (results || []).map(item => {
          let obj = {}
          obj.name = item.industries_name
          obj.value = item.id
          return obj
        })
        this.setState({
          industryList: industryList.concat(indus)
        })
      }
    })
  }
  render() {
    const { common, dispatch, app, history } = this.props
    const { search } = common
    const columns = [
      {
        title: '职业名称',
        dataIndex: 'name',
      },
      {
        title: '职业编号',
        dataIndex: 'code',
      },
      {
        title: '教育水平等级',
        dataIndex: 'edu_level',
      },
      {
        title: '行业',
        dataIndex: 'industry',
      },
      {
        title: '操作',
        render(record) {
          return (
            <div className={cs.tableAction}>
              <span onClick={() => { history.push(`/${app.router.model}/detail/${record.id}`) }} >
                查看详情
              </span>
            </div>
          )
        },
      },
    ]
    return (
      <div>
        <Mcard>
          <Row>
            <Col span={12}>
              <SearchInput
                lable="职业名称"
                value={search.name}
                bindName="name"
              />
              <SearchSelect
                lable="教育水平"
                options={levelType}
                value={search.edu_level}
                bindName="edu_level"
              />
            </Col>
            <Col span={12}>
              <SearchInput
                lable="职业编号"
                value={search.code}
                bindName="code"
              />
              <SearchSelect
                lable="行业"
                options={this.state.industryList}
                value={search.industry}
                bindName="industry"
              />
              <SAButton
                dispatch={dispatch}
                model={app.router.codeModel}
                search={search}
              />
            </Col>
          </Row>
        </Mcard>
        <Mcard >
          {/* <AuthButtonAdd authId="101" history={history} /> */}
          <DataTable columns={columns} model={common} rowKey="id" />
        </Mcard>
      </div>
    )
  }

}

function mapStateToProps({ app, common }) {
  return { common, app }
}

export default connect(mapStateToProps)(CareerList)
