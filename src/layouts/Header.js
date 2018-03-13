import React from 'react'
import { Icon, Layout, Dropdown, Avatar, Menu } from 'antd'
import styles from './index.less'


const Header = ({ user, siderFold, switchSider, onMenuClick }) => {

  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="my"><Icon type="user" />个人中心</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Layout.Header style={{ background: '#fff', padding: 0 }}>
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={siderFold ? 'menu-unfold' : 'menu-fold'}
          onClick={switchSider}
        />
        <div className={styles.right}>
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar size="small" className={styles.avatar} icon="user" />
              <span className={styles.name}>{user.name}</span>
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}

export default Header
