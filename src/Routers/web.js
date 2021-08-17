/*
 * @Author: your name
 * @Date: 2021-07-29 11:00:19
 * @LastEditTime: 2021-08-17 16:04:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/Routers/web.js
 */
import { HomeOutlined, EditOutlined, TeamOutlined,StarFilled } from '@ant-design/icons';
import loadable from '../utils/loadable';

const List = loadable('web/list');
const ArticleDetail = loadable('web/list/detail');
const Archive = loadable('web/archive');
const About = loadable('web/about');
const Star = loadable('web/star');

const webRoutes = [
  {
    menu: true,
    icon: <HomeOutlined/>,
    title: '首页',
    path: '/web/index',
    component: List
  },
  {
    menu: true,
    icon: <EditOutlined/>,
    title: '归档',
    path: '/web/archive',
    component: Archive
  },
  {
    menu: true,
    icon: <StarFilled/>,
    title: '收藏',
    path: '/web/star',
    component: Star
  },
  {
    menu: true,
    icon: <TeamOutlined />,
    title: '关于',
    path: '/web/about',
    component: About
  },
  {
    icon: 'more',
    title: '文章详情',
    path: '/web/detail/:id',
    component: ArticleDetail
  }
]

export default webRoutes;