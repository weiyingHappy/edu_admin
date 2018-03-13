import { Card, Spin } from 'antd'

const Mcard = ({ children, title }) => {
  return (
    <Card title={title} style={{ margin: 24 }}>
      <Spin/>
    </Card>
  )
}

export default Mcard
