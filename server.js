/*
 * @Author: your name
 * @Date: 2021-08-17 15:21:24
 * @LastEditTime: 2021-08-17 15:22:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /QQ-ADMIN/server.js
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
 
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
 
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
 webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
 })
);
 
// Serve the files on port 3000.
app.listen(3006, function () {
 console.log('Example app listening on port 3000!\n');
});