import React from 'react'
import { connect } from 'dva'
import { Spin, Row, Col, Table } from 'antd'
import Mcard from '../../layouts/Mcard'
import { EditableInput } from '../../components/General'
import PageTitle from '../../layouts/PageTitle'

function OrderDetail({ history, order, router, loading }) {
  if (loading.effects[`${router.model}/query`]) {
    return (
      <Spin />
    )
  }
  const { detail } = order
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品编号',
      dataIndex: 'id',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '数量',
      dataIndex: 'num',
    },
    {
      title: '小计',
      dataIndex: 'total',
    },
  ]
  return (
    <PageTitle router={router} title="订单详情">
      <Mcard>
        <Row>
          <Col span={8}>订单编号：{detail.order_no}</Col>
          <Col span={8}>订单状态：{detail.status == 0 ? '未支付' : '已支付'}</Col>
          <Col span={8}>下单时间：{detail.create_time}</Col>
        </Row>
      </Mcard>
      <Mcard>
        <EditableInput title="网点名称" value={detail.net_name} noedit />
        <EditableInput title="货架编号" value={detail.shelf_id} noedit />
        <EditableInput title="支付金额" value={detail.pay_price} noedit />
      </Mcard>
      <Mcard title="交易清单">
        <Table
          columns={columns}
          dataSource={detail.product_snapshot}
          rowKey={(record) => {
            return `data-${record.id}`
          }}
          pagination={false}
        />
      </Mcard>
    </PageTitle>
  )
}

function mapStateToProps({ app, order, loading }) {
  return { order, loading, router: app.router }
}

export default connect(mapStateToProps)(OrderDetail)
