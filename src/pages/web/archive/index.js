/*
 * @Author: your name
 * @Date: 2021-08-04 14:31:47
 * @LastEditTime: 2021-08-13 19:33:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/about/index.js
 */
import React, { useState,useEffect } from 'react';
import { Timeline , Card } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import api from '../../../api';
import { Link } from 'react-router-dom';

const Archive = ()=>{
  const [data,setData] = useState([]);

  const getArticleList = async() => {
    const { data, code } = await api.get('/article/list/all');
    code === 200 && setData(data);
  }

  const itemMap = data.map((v, i) => {
    return <Timeline.Item key={i}>
      <Link to={`/web/detail/${v.id}`}>
        <span className='mr20'>{v.createdAt.slice(0, 10)}</span>
        <span>{v.title}</span>
      </Link>
    </Timeline.Item>
  })

  useEffect(()=>{
    getArticleList();
  },[])

  return <Card bordered={false}>
      <Timeline>
        <Timeline.Item dot={<ClockCircleOutlined />} color="red" style={{lineHeight:'20px'}}><span style={{fontSize:'20px'}}>2019</span></Timeline.Item>
        { itemMap }
      </Timeline>
    </Card>
}

export default Archive;