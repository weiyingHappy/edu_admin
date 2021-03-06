/** SearchActionButton表单操作组件(取消和确认) */
import React from 'react'
import { DatePicker } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { connect } from 'dva'
import cs from './index.less'

function SearchDateRange({ dispatch, router, lable, bindName, value, nocolon }) {
  return (
    <div className={cs.searchItem}>
      <span className={cs.lable}>{lable}{nocolon || '：'}</span>
      <span className={cs.input}>
          <DatePicker.RangePicker
            locale={zhCN}
            value={value}
            onChange={(dates) => {
              const payload = {}
              payload[bindName] = dates
              dispatch({
                type: `${router.model}/changeSearch`,
                payload: { ...payload },
              })
            }}
          />
      </span>
    </div>
  )
}

function mapStateToProps({ app }) {
  return { router: app.router }
}

export default connect(mapStateToProps)(SearchDateRange)
