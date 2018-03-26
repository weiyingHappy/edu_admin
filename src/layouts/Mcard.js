import { Card } from 'antd'

const Mcard = ({ children, title, extra }) => {
  return (
    <Card title={title} style={{ margin: 24 }} extra={extra}>
      {children}
    </Card>
  )
}

export default Mcard
