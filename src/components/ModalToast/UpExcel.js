//新增购买信息
import React from 'react'
import { Modal } from 'antd'
import * as cs from './index.css'


class UpExcel extends React.PureComponent {
  state = {
    fileName: ''
  }
  render() {
    const { title, visible, onCreate, onCancel } = this.props
    return (
      <div>
        <Modal title={title}
          okText="确认"
          cancelText="取消"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}
        >
          <form id="form"
          >
            <a href="javascript:void(0)" className={cs.file}>选择文件
              <input type="file" name="batch_organ"
                onChange={(e) => {
                  this.setState({
                    fileName: e.target.value.slice(e.target.value.lastIndexOf("\\") + 1)
                  })
                }} />
            </a>
            <span>{this.state.fileName}</span>
          </form>
        </Modal>
      </div>
    )
  }
}

export default UpExcel
