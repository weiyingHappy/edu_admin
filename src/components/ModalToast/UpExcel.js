//新增购买信息
import React from 'react'
import { Modal } from 'antd'

class UpExcel extends React.PureComponent {
  state = {

  }
  render() {
    const { title, visible, onCreate, onCancel, dispatch } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      hasFeedback: true,
    }
    return (
      <div>
        <Modal title={title}
          okText="确认"
          cancelText="取消"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
          {/* <form id="f1" ref="f1"
          >
            <input type="file" name="batch_organ" onChange={
              (e) => {
                console.log(e)
                this.setState({ batch_organ: e.target.value })
              }} />
            <input type="submit"
              onClick={(e) => {
                e.preventDefault()
                var fd = new FormData(document.querySelector('#f1'));
                // fd.append("batch_organ", this.state.batch_organ)
                console.log(e, this.refs.f1, fd)
                dispatch({
                  type: 'app/request',
                  uri: '/DownManage/batchOrgan',
                  data: fd,
                  callback: ({ results }) => {
                    console.log('r', results)
                  },
                })
              }
              }
            />
          </form> */}
        </Modal>
      </div>
    )
  }
}

export default UpExcel
