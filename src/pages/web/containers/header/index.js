/*
 * @Author: your name
 * @Date: 2021-08-04 14:04:16
 * @LastEditTime: 2021-08-17 16:09:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/containers/header/index.js
 */
import React from 'react';
import { Layout, Row, Col, Menu,} from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import menus from '../../../../Routers/web';

import styles from './index.module.less';


const { Header } = Layout;



const HeaderCustom = ()=>{

  // const [visible,setVisible] = useState(false);
  const list = menus.filter(v => v.menu)

  const menuList = list.map((item, i) => {
    return <Menu.Item key={i} icon={item.icon} onClick={ () => {} }>
      <Link to={item.path}>
        <span>{item.title}</span>
      </Link>
    </Menu.Item>
  })

  return (
    <Header className={styles.headerContainer}>
      <Row>
        <Col lg={{span: 4}} md={{span: 4}} xs={{span: 0}}>
          <div className={styles.logo}>
            <SmileTwoTone rotate={ 15 } style={{marginRight:"8px"}}/>
             乔乔
            </div>
        </Col>
        <Col lg={{span: 14}} md={{span: 14}} xs={{span: 24}} className={styles.mobile}>
          <Menu mode="horizontal" defaultSelectedKeys={['0']}>
            { menuList }
          </Menu>
        </Col>
      </Row>
    </Header>
  )

} 

export default HeaderCustom;