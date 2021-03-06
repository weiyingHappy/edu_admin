/** SearchActionButton表单操作组件(取消和确认) */
import React from 'react'
import { Button } from 'antd'
import cs from './index.less'

function SAButton({ dispatch, sureName, model, search }) {
  return (
    <span style={{ display: 'inline-block', paddingLeft: '24%', height: 40 }} className={cs.sabutton}>
      <Button
        style={{ marginRight: 20 }}
        onClick={() => {
          dispatch({
            type: `${model}/clearSearch`,
          })
          if (JSON.stringify(search) !== '{}') {
            dispatch({
              type: `${model}/query`,
            })
          }
        }}
      >
        清除
      </Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: `${model}/query`,
          })
        }}
      >
        {sureName || '查询'}
      </Button>
    </span>
  )
}

export default SAButton
