/*
 * @Author: your name
 * @Date: 2021-08-04 14:26:58
 * @LastEditTime: 2021-08-17 16:11:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/list/index.js
 */
import React,{ useState , useEffect} from 'react';
import { List } from 'antd';
import api from '../../../api';

import styles from './index.module.less';



const Star = () => {

  const [data,setData] = useState([]);
  // const [pageNo,setPageNo] = useState(1);
  const [total,setTotal] = useState(0);
  const pageSize = 10;
  const pageNo = 1;


  const getList = async() => {
    const params = {
      title: '',
      pageNo,
      pageSize
    }
    const {data, total: Total} = await api.get('star/list', params)
    setData(data);
    setTotal(Total);
  }

  useEffect(()=>{
    getList();
  },[pageNo])

  const pagination = {
    pageSize: 10,
    size: 'small',
    current: pageNo,
    total,
    // onChange: ((page, pageSize) => {
    //   this.setState({
    //     currentPage: page
    //   })
    // })
  }

  return <List
    className={styles.starList}
    header={<div className={styles.starHeader}>文章收藏</div>}
    itemLayout="vertical"
    pagination={data.length ? pagination : null}
    dataSource={data}
    renderItem={item => (
      <List.Item key={item.id} extra={item.date} >
        <List.Item.Meta description={[<a key={item.url} href={item.url} target='_blank' rel="noopener noreferrer">{item.title}</a>]}/>
      </List.Item>
    )}
  />
}

export default Star;