/*
 * @Author: your name
 * @Date: 2021-07-29 10:49:14
 * @LastEditTime: 2021-08-17 16:08:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/admin/layout/index.js
 */
import React,{ useState } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import OutLogin from '../containers/outLogin';
import NotFound from '../../404';



import routes from '../../../Routers/admin';
import styles from './index.module.less';

const { Header, Sider, Content } = Layout


const AdminLayout = ({history})=>{
  const [collapsed,setCollapsed] = useState(false);
  const [breadcrumb,setBreadcrumb] = useState(['首页'])


  const menuItem = ()=>routes.filter(Item => Item.menu).map((itemss, index) => {
    console.log(itemss.path,999999,routes.filter(Item => Item.menu))
    return (
    <Menu.Item key={ itemss.path } icon={itemss.icon} onClick={ () => handleClickMenuItem(itemss.title) }>
      <Link to={itemss.path}>
        <span>{ itemss.title }</span>
      </Link>
    </Menu.Item>)
  })

  const handleClickMenuItem = (value)=>{
    setBreadcrumb([value])
  }
  return <>
   <Layout style={{minHeight: '100vh'}}>
   <Header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoTitle}>博客管理系统</div>
          {
            collapsed ? <MenuUnfoldOutlined onClick={()=>{setCollapsed(false)}}/>:<MenuFoldOutlined onClick={()=>{setCollapsed(true)}}/>
          }
      </div>
      <OutLogin {...history}/>
    </Header>
    <Layout>
      <Sider
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.site}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['/admin/home']}
          selectedKeys={[history.location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {menuItem()}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {
            breadcrumb.length>0&&breadcrumb.map((item,index)=><Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
          }
        </Breadcrumb>
        <Content
          className={styles.site}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
           <Switch>
            <Route  path='/admin' exact render={() => <Redirect to="/admin/home" push />} />
            {routes.map((route, i) => {
              return (
                <Route
                key={i}
                excat={route.excat}
                path={route.path}
                component={route.component}
              />
              )})}
              {/* <Route component={NotFound}/> */}
           </Switch>
        </Content>
      </Layout>
    </Layout>
   </Layout>
  </>
}

export default AdminLayout;