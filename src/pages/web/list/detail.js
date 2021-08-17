/*
 * @Author: your name
 * @Date: 2021-08-04 14:26:58
 * @LastEditTime: 2021-08-13 11:49:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/pages/web/list/index.js
 */
import React,{ useState,useEffect } from 'react';
import { Card } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import api from '../../../api';

// import styles from './detail.less';



const ArticleDetail = (props) => {
  const [ data, setData ] = useState({title: ''});
  const [editorState,setEditorState] = useState(EditorState.createEmpty());

  const getDetail = async() => {
    const id = props.match.params.id;
    const { data } = await api.get('/article/detail', {id});
    const { content } = data;
    const contentBlock = htmlToDraft(content);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setData(data);
    setEditorState(editorState);
  }

  useEffect(()=>{
    getDetail()
  },[])

  const extra = <>
      <CalendarOutlined style={{ marginRight: 8 }}/>
      { data.createdAt }
      <EyeOutlined style={{ marginRight: 8, marginLeft: 8 }} />
      { data.readedCount } 次预览
    </>

  return <Card
    title={data.title}
    extra={extra}
    >
      <Editor
      readOnly
      toolbarHidden
      editorState={editorState}
      editorClassName="editor"
      />
    </Card>
}

export default ArticleDetail;