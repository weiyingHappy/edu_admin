import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { apiPrefix } from '../../../configs/config'

function DownLoadButton({ dispatch, loading, marginLeft, marginRight, state }) {
  const handleExport = () => {
    dispatch({
      type: 'app/request',
      uri: 'Export/listOrder',
      data: state.search,
      callback: ({ results }) => {
        const url = `${apiPrefix()}/excels/${results}.xlsx`
        let a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('target', '_blank')
        a.click()
      },
    })
  }

  return (
    <span>
      <Button
        style={{ marginLeft: marginLeft || 0, marginRight: marginRight || 0 }}
        icon="file-excel"
        loading={loading.effects['app/request']}
        onClick={handleExport}
      >
        下载报告
      </Button>
    </span>
  )
}

function mapStateToProps({ loading }) {
  return { loading }
}

export default connect(mapStateToProps)(DownLoadButton)
