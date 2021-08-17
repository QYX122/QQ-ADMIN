/*
 * @Author: your name
 * @Date: 2021-08-04 14:26:58
 * @LastEditTime: 2021-08-17 16:10:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/list/index.js
 */
import React,{ useState,useEffect } from 'react';
import  * as Icons from '@ant-design/icons';

import { 
  List,
  Tag
} from 'antd';
import api from '../../../api';
import { color } from '../../../utils';



import styles from './index.module.less';
// const { Item:ListItem } = List;


const BlogList = (props) => {
  const [data,setData] = useState([]);
  const [pageNo,setPageNo] = useState(1);
  const [total,setTotal] = useState(0);
  const pageSize = 7;

  const pagination = {
    current: pageNo,
    pageSize,
    total,
    size: 'small',
    onChange: (page => setPageNo(page))
  }

  const getList = async() => {
    const params = {
      pageNo,
      pageSize
    }
    const { data, code, total:Total } = await api.get('/article/list', params);
    if(code === 200) {
      setData(data);
      setTotal(Total);
    }
  }


  useEffect(()=>{
    getList();
  },[pageNo])

  const IconText = ({ type, text }) => (
    <span>
      {
        React.createElement(
          Icons[type],{style: {marginRight: 8} }
        )
      }
      {text}
    </span>
  )

  return <div className={styles.listWrapper}>
    <List
      itemLayout="vertical"
      size="large"
      pagination={data.length ? pagination : null}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={
          [ 
            <IconText type="TagsOutlined" text={
              item.tag.map(v => (
                <Tag
                  key={item + Math.random()}
                  color={color[Math.floor(Math.random()*color.length)]}
                >
                  {v}
                </Tag>
              ))
            } />,
            item.category ?
            <IconText type="FolderOutlined" text={
              item.category.map(v => (
                <Tag
                  key={item + Math.random()}
                  color='green'
                >
                  {v}
                </Tag>
              ))
            }/> : null,
            <IconText type="CalendarOutlined" text={item.createdAt} />,
            <IconText type="EyeOutlined" text={`${item.readedCount} 次预览`} />
          ]}
        >
          <List.Item.Meta
            className={styles.listItem}
            title={item.title}
            description={item.summary}
            onClick={()=>props.history.push(`/web/detail/${item.id}`)}
          />
        </List.Item>
      )}
    >

    </List>
  </div>
}

export default BlogList;