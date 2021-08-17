/*
 * @Author: your name
 * @Date: 2021-08-04 14:31:47
 * @LastEditTime: 2021-08-17 16:09:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/about/index.js
 */
import React from 'react';
import { Divider, Card } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import styles from './index.module.less';

const About = ()=>{
  return  (
    <Card bordered={false}>
    <div className={styles.about}>
      <Divider orientation="left">Blog</Divider>
      <p>前端：react + antd + react-router + es6 + webpack + axios</p>
      <p>服务端：koa2 + mysql + sequelize</p>
      <p className={styles.code}>源码戳这里</p>
      <p>
        <a
        target="_blank"
        className={styles.link}
        rel="noreferrer noopener"
        href="https://github.com/gzwgq222/blog-admin">
          web端
        </a>
      </p>
      <p>
        <a
        target="_blank"
        className={styles.link}
        rel="noreferrer noopener"
        href="https://github.com/gzwgq222/blog-server">
          node服务端
        </a>
      </p>
      <Divider orientation="left">Me</Divider>
      <ul className={styles.aboutList}>
        <li>姓名：Gong Qiang</li>
        <li>
          <GithubOutlined style={{fontSize: '16px'}}/>：
          <a
          target="_blank"
          className={styles.link}
          rel="noreferrer noopener"
          href="https://github.com/gzwgq222">
            github
          </a>
        </li>
        <li>
          联系方式：
          <span>13522347298</span>
          <Divider type="vertical" />
          <i className={styles.iconEmail} />
          <a href="mailto:445722156@qq.com">qyx199999@163.com</a>
        </li>
        <li>坐标：北京市</li>
        <li>学历专业：本科<Divider type="vertical" />电子信息工程</li>
        <li>
          skill：
          <ul>
            <li>
             前端：React、ES6/7/8、Echat、Axios
            </li>
            <li>
              服务端：Node、Koa2
            </li>
            <li>
              数据库：Mysql
            </li>
            <li>
              其他：webpack、git、nginx
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Card>
  )
}

export default About;