/*
 * @Author: your name
 * @Date: 2021-07-30 10:33:43
 * @LastEditTime: 2021-08-17 16:08:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/admin/article/edit.js
 */
import React,{ useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Form, Input, Button, Select, message } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import api from '../../../api';


import styles from './index.module.less';


const { Item:FormItem } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 5 },
    xxl: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 12 }
  }
}

const CreateArticle = (props) => {
  const [form] = Form.useForm();
  // const loading = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [categoryOptions,setCategoryOptions] = useState([]);
  const [tagOptions,setTagOptions] = useState([]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }
console.log(categoryOptions,9998877)
  const categoryOption = categoryOptions.map(category => {
    return <Option value={category.name} key={category.id}>{category.name}</Option>
  })
  const tagOption = tagOptions.map(tag => {
    return <Option value={tag.name} key={tag.id}>{tag.name}</Option>
  })

  const handlChangeCategory = (values)=>{
    console.log(values,'~~~')
  }

  const handleChangeTag = ()=>{
    
  }

  const handleSubmit = (e)=>{
    // e.preventDefault()
    form.validateFields().then(async values=>{
      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      let params = {
        ...values,
        category: String(values.category),
        tag: String(values.tag),
        content
      }
      console.log(values)
      const {code} = await api.post('/article/create', params)
        if (code === 200) {
          message.success('新增成功')
         props.history.push('/admin/article')
      }
    })
    
  }

  useEffect(()=>{
    const id = props.match.params.id
    getTagList();
    id && getDetail(id)
  },[])

  const getTagList = async() => {
    const {data, code} = await api.get('tag/list/all')
    console.log(data)
    if (code === 200) setCategoryOptions(data);
    const category = await api.get('category/list/all')
    if (category.code === 200) setTagOptions(category.data)
   }

  const getDetail =  async(id) => {
    const {code, data} = await api.get('/article/item', {id})
    if (code !== 200) return false
    const { title, author, summary, category, tag, content } = data
    form.setFieldsValue({title, author, summary, category, tag})
    const contentBlock = htmlToDraft(content)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)
    setEditorState(editorState)
  }

  return <div className={styles.adminArticle}>
    <Form {...formItemLayout} form={form} onFinish={handleSubmit}>
      <FormItem
        name="title"
        label="标题"
        rules={[
          {
            required: true,
            message: '请输入标题'
          },
        ]}
      >
        <Input placeholder="请输入标题" allowClear={true} maxLength={30}/>
      </FormItem>
      <FormItem
        name="author"
        label="作者"
        rules={[
          {
            required: true,
            message: '请输入作者'
          },
        ]}
      >
        <Input placeholder="请输入作者" allowClear={true}  maxLength={10}/>
      </FormItem>
      <FormItem
        name="summary"
        label="摘要"
        rules={[
          {
            required: true,
            message: '请输入描述'
          },
        ]}
      >
        <Input placeholder="请输入描述" allowClear={true} />
      </FormItem>
      <FormItem
        name="category"
        label="分类"
        rules={[
          {
            required: true,
            message: '请选择分类'
          },
        ]}
      >
         <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择分类"
            onChange={handlChangeCategory}
            >
            { categoryOption }
          </Select>
      </FormItem>
      <FormItem
        name="tag"
        label="标签"
        rules={[
          {
            required: true,
            message: '请选择标签'
          },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="请选择标签"
          // addonBefore='标签'
          onChange={handleChangeTag}>
          { tagOption }
        </Select>
      </FormItem>
      <FormItem
        label="内容"
        wrapperCol={{span: 19}}
      >
        <Editor
          editorState={editorState}
          editorClassName={styles.editor}
          onEditorStateChange={onEditorStateChange}
        />
      </FormItem>
      <FormItem
        wrapperCol={{span: 24}}
      >
        <div className={styles.articleButton}>
              <Button type="primary" htmlType="submit">
                保存
              {/* { txt } */}
              </Button>
            </div>
      </FormItem>
    </Form>
  </div>
}

export default CreateArticle;