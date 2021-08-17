/*
 * @Author: your name
 * @Date: 2021-08-13 14:46:06
 * @LastEditTime: 2021-08-13 17:26:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/404/index.js
 */
import React from 'react';
import noPagePic from '../../assets/nopage.png';
import styles from './index.less';

const NotFound = ()=><div className={styles.noPage}>
  <img src={noPagePic} alt=''/>
  <span>抱歉，暂时没有相关页面</span>
</div>

export default NotFound;