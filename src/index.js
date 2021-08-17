/*
 * @Author: your name
 * @Date: 2021-08-16 14:46:06
 * @LastEditTime: 2021-08-17 10:32:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /QQ-ADMIN/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';
import pic from './test.jpeg';

ReactDOM.render(
  <React.StrictMode>
    <div className={styles.title}>你好!!!986，React-webpack5-template
    <img src={require('./test.jpeg')}></img>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);