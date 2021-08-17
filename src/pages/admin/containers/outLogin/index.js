/*
 * @Author: your name
 * @Date: 2021-07-21 13:59:36
 * @LastEditTime: 2021-08-17 16:08:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/pages/containers/OutLogin/index.js
 */
import React from 'react';
import { Avatar, Image,Dropdown,Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import userPic from '../../../../assets/userPic.jpeg';
import styles from './index.module.less';

const OutLogin = ({push})=>{
  const handleOutLogin = ()=>{
    push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">切换用户</Menu.Item>
      <Menu.Item key="2" onClick={handleOutLogin}>退出登录</Menu.Item>
    </Menu>
  )

  return <div className={styles.user}>
    <Dropdown overlay={menu}>
      <span className={styles.userName} onClick={e => e.preventDefault()}>
         { sessionStorage.getItem('blogUser') }
         <DownOutlined />
      </span>
    </Dropdown>
    <Avatar
      src={<Image src={userPic} />}
    />
  </div>
}

export default OutLogin;