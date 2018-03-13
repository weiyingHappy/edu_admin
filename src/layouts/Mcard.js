import { Card } from 'antd'

const Mcard = ({ children, title }) => {
  return (
    <Card title={title} style={{ margin: 24 }}>
      {children}
    </Card>
  )
}

export default Mcard
