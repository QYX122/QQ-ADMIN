/*
 * @Author: your name
 * @Date: 2021-07-29 10:57:23
 * @LastEditTime: 2021-08-13 19:33:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/admin/login/index.js
 */
import React,{ useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Table, Form, Input, Button, message, Tag } from 'antd';
import { color } from '../../../utils';
import api from '../../../api';



// import styles from './index.less';

const { Item:FormItem } = Form;


const Article = (props)=>{
  const [form] = Form.useForm();
  // const [loading,setDoading] = useState(false);
  const [pageNo,setPageNo] = useState(1);
  // const [pageSize,setPageSize] = useState(10);
  const [total,setTotal] = useState(0);
  const [data,setData] = useState([]);
  const pageSize = 10;


  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      align: 'center',
      render: (current, row, index) => index + (pageNo-1) * 10 + 1,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      width: 400
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: category => (
        category.map((v, index) => <Tag key={index} color={color[Math.floor(Math.random()*color.length)]}>{ v }</Tag>)
      )
    },
    {
      title: '访问次数',
      dataIndex: 'readedCount',
      key: 'readedCount',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    },
    {
      title: '操作',
      align: 'center',
      width: 180,
      render: record => (
        <span>
          <Button ghost type='primary' className='mr10' onClick={()=>handleEdit(record.id)}>编辑</Button>
          <Button ghost type='danger' onClick={()=>handleDelete(record.id)}>删除</Button>
        </span> 
      )
    }
  ]
 
  const handleEdit = (id)=>{
    props.history.push(`/admin/article-edit/${id}`)
  }

  const handleDelete = async(id)=>{
    const {code} = await api.post('article/destroy', {id})
    if (code === 200) {
      message.success('删除成功')
      getList()
    }
  }

  const handleSubmit = (e)=>{
    // e.preventDefault()
    form.validateFields().then(values=>{
      console.log(values);
      getList(values);
      setPageNo(1);
    })
  }

  const onReset = () => {
    form.resetFields();
  };

  const getList = async(values)=>{
    const params = {
      ...values,
      pageNo,
      pageSize
    }
    const { data,total } = await api.get('/article/list', params);
    setData(data)
    setTotal(total)
  }

  const changePage = (e) => {
    console.log(e,'第几页')
    setPageNo(e)
  };
    // 显示总数
  const showTotal = total => `总共${total}条记录`;

  useEffect(()=>{
    getList()
  },[pageNo])

  
  return <>
    <Form layout="inline" form={form} onFinish={handleSubmit}>
      <FormItem
        name="title"
        label="文章标题"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="请输入标题" allowClear={true} />
      </FormItem>
      <FormItem>
        <Button type="primary" className='mr10' htmlType="submit">
          查询
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </FormItem>
      <FormItem>
        <Link to='/admin/article-add'>
          <Button type='link'>创建</Button>
        </Link>
      </FormItem>
    </Form>
    <Table
      bordered
      className='mt10'
      pagination={{
        current: pageNo,
        total,
        onChange: (e)=>changePage(e),
        showTotal: () => showTotal(total),
      }}
      // loading={this.state.loading}
      columns={ columns }
      dataSource={ data }
      rowKey={record => record.id} 
    />
  </>
}

export default Article;