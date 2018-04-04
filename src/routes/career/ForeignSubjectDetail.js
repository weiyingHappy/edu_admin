import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
function ForeignSubjectDetail({ common, app, loading, history }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common

  return (
    <PageTitle router={app.router} title="职业详情">
      <Mcard title="基本信息">
        <Row>
          <Col span={8}>学科名称：{detail.name}</Col>
          <Col span={8}>专业代码：{detail.id}</Col>
        </Row>
      </Mcard>
      <Mcard title="学科介绍">
        <div dangerouslySetInnerHTML={{ __html: detail.intro ? detail.intro : '<p>暂无</p>' }}></div>
        {/* <p>{detail.intro}</p> */}
      </Mcard>
      <Mcard title="推荐">
        {detail.recommend ? (detail.recommend || []).map(item => (<p>{item}</p>)) : '暂无'}
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {

  return { loading, common, app }
}

export default connect(mapStateToProps)(ForeignSubjectDetail)
