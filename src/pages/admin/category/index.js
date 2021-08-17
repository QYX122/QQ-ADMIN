/*
 * @Author: your name
 * @Date: 2021-07-29 10:57:23
 * @LastEditTime: 2021-08-13 11:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/admin/login/index.js
 */
import React,{ useEffect, useState } from 'react';
import { color } from '../../../utils';
import { Table, Form, Input, Button, message, Modal, Tag } from 'antd';
import api from '../../../api';

const { Item:FormItem } = Form;



const Category = ()=>{
  const [form] = Form.useForm();
  const [visible,setVisible] = useState(false);
  const [tag,setTag] = useState('');
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
      title: '分类',
      dataIndex: 'name',
      render: name => (
        <Tag color={color[Math.floor(Math.random()*color.length)]}>{ name }</Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: record => (
        <span>
          <Button ghost type='danger' onClick={()=>handleClick(record)}>delete</Button>
        </span>
      ),
    }
  ]

  const getList = async(values) => {
    // this.setState({loading: true})
    const params = {
      name:'',
      ...values,
      pageNo,
      pageSize
    }
    const {data, total } = await api.get('category/list', params)
    setData(data);
    setTotal(total);
  }


  const handleClick = async(record)=> {
    await api.post('category/destroy', {id: record.id})
    message.success('删除成功')
    getList()
  }
  const handleOk = async()=>{
    const {code, data} = await api.post('category/create', {name: tag});
    setVisible(false);
    if (code === 200){
      message.success('新增成功！');
      getList();
    }else message.error(data);
  }
  
  const changePage = (e) => {
    console.log(e,'第几页')
    setPageNo(e)
  };

     // 显示总数
  const showTotal = total => `总共${total}条记录`;

  const handleSubmit = (e)=>{
    // e.preventDefault()
    console.log('查询')
    form.validateFields().then(values=>{
      console.log(values);
      getList(values);
      setPageNo(1);
    })
  }

  useEffect(()=>{
    getList();
  },[])
  return <div>
    <Modal
      title="标签"
      visible={ visible }
      onOk={handleOk}
      onCancel={ ()=>setVisible(false) }>
      <Input placeholder="请输入标签"  allowClear={true} value={ tag } onChange={ e => setTag(e.target.value) } />
    </Modal>
    <Form layout="inline" form={form} onFinish={handleSubmit}>
      <FormItem
          name="name"
        >
        <Input placeholder="请输入标签" allowClear={true} />
      </FormItem>
      <FormItem>
        <Button className='mr10' type="primary" htmlType="submit">
          查询
        </Button>
        <Button type='primary' onClick={()=>setVisible(true)}>
        创建
        </Button>
      </FormItem>
    </Form>
    <Table
        bordered
        className='mt10'
        pagination={{
          current: pageNo,
          showSizeChanger: true,
          total,
          pageSize: pageSize,
          pageSizeOptions: ['10', '20', '30', '40'],
          showTotal: () => showTotal(total),
          onChange:(page) => changePage(page)
        }}
        columns={ columns }
        dataSource={ data }
        rowKey={record => record.id}
        
      />
  </div>
}

export default Category;