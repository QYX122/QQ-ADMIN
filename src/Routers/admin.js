/*
 * @Author: your name
 * @Date: 2021-07-20 11:20:27
 * @LastEditTime: 2021-08-17 16:03:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/Routers/admin.js
 */
import loadable from '../utils/loadable';
import { HomeOutlined, EditOutlined, TagsOutlined, AppstoreOutlined,StarFilled } from '@ant-design/icons';

const adminRoots = [
  {
    menu: true,
    icon: <HomeOutlined />,
    title: '首页',
    path: '/admin/home',
    component: loadable('admin/home')
  },
  {
    menu: true,
    icon: <EditOutlined />,
    title: '文章',
    path: '/admin/article',
    component: loadable('admin/article')
  },
  {
    menu: true,
    icon: <TagsOutlined />,
    title: '标签',
    path: '/admin/tags',
    component: loadable('admin/tags')
  },
  {
    menu: true,
    icon: <AppstoreOutlined />,
    title: '分类',
    path: '/admin/category',
    component:loadable('admin/category')
  },
  {
    menu: true,
    icon: <StarFilled/>,
    title: '收藏',
    path: '/admin/star',
    component:loadable('admin/star')
  },
  {
    menu: false,
    title: '收藏',
    path: '/admin/star',
    component:loadable('admin/star')
  },
  {
    icon: <EditOutlined />,
    title: '新增文章',
    path: '/admin/article-add',
    component: loadable('admin/article/edit')
  },
  {
    icon: 'edit',
    title: '文章详情',
    path: '/admin/article-edit/:id',
    component: loadable('admin/article/edit')
  }
]

export default adminRoots