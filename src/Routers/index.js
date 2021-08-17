/*
 * @Author: your name
 * @Date: 2021-07-29 10:42:00
 * @LastEditTime: 2021-08-17 15:39:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/Routers/index.js
 */
import loadable from '../utils/loadable';

const adminLayout = loadable('admin/layout')
const webLayout = loadable('web/layout')

const routes = [
  {
    path: '/admin',
    component: adminLayout
  },
  {
    path: '/web',
    component: webLayout
  }
]

export default routes