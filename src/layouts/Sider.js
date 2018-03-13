import React from 'react'
import { Menu, Icon, Layout } from 'antd'
import { menus, openkeys } from '../configs/sider.config'
import { Link } from 'dva/router'
import styles from './index.less'

class Sider extends React.PureComponent {
  state = {
    openKeys: [],
    selectedKey: [],
  };

  componentWillMount() {
    const sd = openkeys[this.props.router.model]
    this.setState({ selectedKey: [sd ? sd.sub : '1_1'] })
    this.setState({ openKeys: [sd ? sd.key : '1'] })
  }

  onOpenChange = (nopenKeys) => {
    this.setState({
      openKeys: nopenKeys,
    })
  }

  onSelect = (selected) => {
    this.setState({
      selectedKey: selected.selectedKeys,
      openKeys: [selected.key.split('_')[0]],
    })
  }

  getMenus = () => {
    if (this.props.user.funcs) {
      return (menus || []).map((item) => {
        let _menu = null
        if (item.fid === null || item.fid == undefined || this.props.user.funcs.includes(item.fid)) {
          // 通过检验，渲染菜单
          if (item.sub && item.sub.length > 0) {
            // let t_menu =
            const sub = item.sub.filter((subItem) => {
              return subItem.fid === null || subItem.fid == undefined || this.props.user.funcs.includes(subItem.fid)
            })
            if (sub.length > 0) {
              _menu = (
                <Menu.SubMenu
                  key={item.id}
                  title={<span>{item.icon && <Icon type={item.icon} />}{!this.props.siderFold && item.name}</span>}
                >
                  {sub.map((sitem) => {
                    return (
                      <Menu.Item key={sitem.id}>
                        <Link to={sitem.route}>
                          {sitem.icon && <Icon type={sitem.icon} />}{sitem.name}
                        </Link>
                      </Menu.Item>)
                  })}
                </Menu.SubMenu>
              )
            }
          } else {
            _menu = (<Menu.Item key={item.id}>
              <Link to={item.route}>
                {item.icon && <Icon type={item.icon} />}{!this.props.siderFold && item.name}
              </Link>
            </Menu.Item>)
          }
        }
        return _menu
      })
    }
    return ''
  }

  render() {

    const menuProps = this.props.siderFold ? {} : {
      openKeys: this.state.openKeys,
    };

    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={this.props.siderFold}
        className={styles.sider}
        width={256}
      >
        <div className={styles.logo} key="logo">
          {this.props.siderFold
            ?
            '酷'
            :
            <img alt="logo" src="http://ov2ek9bbx.bkt.clouddn.com/FoZHpC67Opsur5D-19AbAc2R7OR_" />
          }
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          inlineCollapsed={true}
          selectedKeys={this.state.selectedKey}
          onOpenChange={this.onOpenChange}
          onSelect={this.onSelect}
        >
          {this.getMenus()}
        </Menu>
      </Layout.Sider>
    )
  }
}
export default Sider
