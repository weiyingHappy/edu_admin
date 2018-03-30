import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'dva'
import { Mcard, PageTitle, MySpin } from '../../layouts'
function CareerDetail({ common, app, loading, history }) {

  if (!app.init) {
    return <Mcard><h1>404 Not Found</h1></Mcard>
  }

  if (loading.effects[`${app.router.codeModel}/query`]) {
    return <MySpin />
  }

  const { detail } = common
  console.log(app)
  return (
    <PageTitle router={app.router} title="职业详情">
      <Mcard title="基本信息">
        <Row>
          <Col span={8}>职业编号：{detail.class_name}</Col>
          <Col span={8}>职业评级：{detail.id}</Col>
          <Col span={8}>学校名称：{detail.school ? detail.school.school_name : ''}</Col>
          <Col span={8}>人数：{detail.persons}</Col>
        </Row>
      </Mcard>
      <Mcard title="职业定义">
        <p>{detail.define}</p>
      </Mcard>
      <Mcard title="日常工作">
        {detail.daily ?
          (detail.daily || []).map((item, i) => (
            <p key={i}>{i + 1}、{item}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="工作特点">
        {detail.feature ?
          (detail.feature || []).map((item, i) => (
            <p key={i}>{i + 1}、{item.class}------{item.desc}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="知识要求">
        {detail.knowledge ?
          (detail.knowledge || []).map((item, i) => (
            <p key={i}>{i + 1}、{item.class}------{item.desc}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="个性要求">
        {detail.characteristic ?
          (detail.characteristic || []).map((item, i) => (
            <p key={i}>{i + 1}、{item}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="国内专业">
        {detail.related_major ?
          (detail.related_major || []).map((item, i) => (
            <p key={i}>{i + 1}、{item}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="国外专业">
        {detail.related_major_foreign ?
          (detail.related_major_foreign || []).map((item, i) => (
            <p key={i}>{i + 1}、{item}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="建议实践活动">
        {detail.high_school ?
          (detail.high_school || []).map((item, i) => (
            <p key={i}>{i + 1}、{item}</p>
          ))
          : '暂无'
        }
      </Mcard>
      <Mcard title="其他相关职业">
        {detail.related ?
          (detail.related || []).map((item, i) => (
            <p key={i}>{i + 1}、{item.name}</p>
          ))
          : '暂无'
        }
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ loading, common, app }) {
  return { loading, common, app }
}

export default connect(mapStateToProps)(CareerDetail)
