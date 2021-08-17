/*
 * @Author: your name
 * @Date: 2021-08-04 15:53:08
 * @LastEditTime: 2021-08-17 16:10:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/containers/sider/index.js
 */
import React, { useState, useEffect } from 'react';
import avatar from '../../../../assets/mdz.jpeg';
import { Card, Tag, Divider } from 'antd';
import { color } from '../../../../utils';
import api from '../../../../api';


import styles from './index.module.less';

const SiderCustom = (props)=>{
  const [articleData,setArticleData] = useState([]);
  const [tags,setTags] = useState([]);

  const getArticleList = async() => {
    const { data, code } = await api.get('/article/list', {pageNo:1, pageSize: 5})
    code === 200 && setArticleData(data);
  }

  const getTags = async() => {
    const {data, code} = await api.get('tag/list/all')
    code === 200 && setTags(data)
   }

  const handleDetail = (id)=>{
    console.log(props.history)
    props.history.push(`/web/detail/${id}`)
  }
  const list = articleData.map(v => (
    <li key={v.id} onClick={ ()=> handleDetail( v.id) }>
      {v.title}
    </li>
  ))

  useEffect(()=>{
    getArticleList();
    getTags();
  },[])

  return <div className={styles.siderContainer}>

      <div className={styles.adminInfo}>
        <img className={styles.avatar} src={avatar} alt="avatar" title='我叫乔乔，一个佛系少女'/>
        <span className={styles.adminName}>喬喬</span>
        <span className={styles.adminDesc}>
          不再沉寂的活着，我要重启我的骄傲
          <br />
          前端摸鱼人员，全村最靓的女子
        </span>
      </div>
    
      <div className={styles.recentArticle}>
        <Card bordered={false}>
          <Divider orientation="left">最近文章</Divider>
          <ul className={styles.recentList}>
            { list }
          </ul>
        </Card>
      </div>
    <div className={styles.tagsWrapper}>
      <Card bordered={false}>
        <Divider orientation="left">标签</Divider>
        <div className={styles.tagsContent}>
          {
            tags.map(v => (
              <Tag
                key = {v.id}
                color={color[Math.floor(Math.random()*color.length)]}
              >
                {v.name}
              </Tag>
            ))
          }
        </div>
      </Card>
    </div>
  </div>
}
export default SiderCustom