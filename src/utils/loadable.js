/*
 * @Author: your name
 * @Date: 2021-07-29 10:42:55
 * @LastEditTime: 2021-08-17 15:42:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: /qyx-admin/src/utils/loadable.js
 */
import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
import styles from './reset.module.less';

//通用的过场组件
const loadingComponent =()=>{
  return (
    <div className={styles.example}>
      <Spin size="large" tip="Loading..."/>
    </div>
  ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
const loadable = (path, loading = loadingComponent) => {
  // console.log('地址~',path,`../pages/${path}`)
  return Loadable({
    loader:() => import(`../pages/${path}`),
    loading
  })
}

export default loadable;