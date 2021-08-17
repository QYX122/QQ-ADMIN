/*
 * @Author: your name
 * @Date: 2021-07-29 10:57:23
 * @LastEditTime: 2021-08-17 16:09:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/admin/login/index.js
 */
import React from 'react';
import { Form, Input, Button, Card, message  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Particles from 'react-particles-js';


import api from '../../../api';




import styles from './index.module.less';

const { Item:FormItem } = Form;

const Login = ({history:{push}})=>{
  const [form] = Form.useForm();

  const handleSubmit = ()=>{
    // e.preventDefault()
    form.validateFields().then(async values=>{
      const {code, msg, data} = await api.post('/loginIn', values)
        if (code === 200) {
          message.success(msg)
          sessionStorage.setItem('blogUser', data.name)
          push('/admin/home')
        } else {
          message.error(msg)
        }
    })
  }
  return <div className={styles.login}>
    <Particles
      params={{
        particles: {
          color: {
            value: "#00BFFF"
          },
          line_linked: {
            color: {
              value: "#00FFFF"
            }
          },
          number: {
            value: 66
          },
          size: {
            value: 6
          }
        }
      }}
    />
    <Card className={styles.loginForm} style={{width: 300,borderRadius: 4}}>
      <Form form={form} onFinish={handleSubmit}>
        <FormItem
          name="userName"
          rules={[
            {
              required: true,
              message: '请输入用户名'
            },
          ]}
        >
          <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" allowClear={true} maxLength={30}/>
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            },
          ]}
        >
          <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" allowClear={true} maxLength={30}/>
        </FormItem>
        <Button type="primary" htmlType="submit" block>登录</Button>
      </Form>
    </Card>
  </div>
}

export default Login;