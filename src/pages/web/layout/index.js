/*
 * @Author: your name
 * @Date: 2021-07-29 10:49:14
 * @LastEditTime: 2021-08-17 16:10:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/admin/layout/index.js
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import routes from '../../../Routers/web';
import HeaderCustom from '../containers/header';
import SiderCustom from '../containers/sider';





import styles from './index.module.less';

const {  Content, Footer, Sider } = Layout;


const WebLayout = (props)=>{
  // const contentHeight = document.body.clientHeight - 64 -62
  return <>
    <Layout className={styles.wrapper}>
      <HeaderCustom/>
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className={styles.layoutBackground} width={300}>
          <SiderCustom {...props}/>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {
            routes.map(({ path, key, component }, index) => (
              <Route key={index}
                exact
                path={path}
                component={component}
              />
            ))
          }
        </Content>
      </Layout>
    </Content>
      
    <Footer style={{ textAlign: 'center' }}>Copyright © Qiao 2021</Footer>
    <BackTop visibilityHeight='100' />
    </Layout>
  </>
}

export default WebLayout;