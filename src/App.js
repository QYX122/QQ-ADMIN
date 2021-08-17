/*
 * @Author: your name
 * @Date: 2021-07-29 10:28:56
 * @LastEditTime: 2021-08-17 16:38:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /qyx-admin/src/App.js
 */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'; 
import NotFound from './pages/404';

import routes from './Routers';
import requireLogin from './requireLogin';
import Login from './pages/admin/login';

const APP = ()=>(
  <Router>
    <withRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/web/index" push />} />
        <Route path='/login' component={Login} />
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            component={
              route.path.includes('/admin')
              ? requireLogin(route.component)
              : route.component
            }
          />
          ))}
        <Route component={NotFound} />
      </Switch>
    </withRouter>
  </Router>
)

export default APP;