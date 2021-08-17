/*
 * @Author: your name
 * @Date: 2021-08-16 14:45:45
 * @LastEditTime: 2021-08-17 10:31:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /QQ-ADMIN/webpack.common.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;


module.exports = (env) => {
  return {
    mode: "development",
    entry: {
      index: './src/index.js'
    },
    output: {
      // 打包文件根目录
      path: path.resolve(__dirname, "dist/"),
    },
    plugins: [
      // 生成 index.html
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./build/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: ["babel-loader"],
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: lessRegex,
         exclude: lessModuleRegex,
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
          sideEffects: true,
        },
        {
          test: lessModuleRegex,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                }
              }
            },
            "postcss-loader",
            "less-loader"
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        //  // file-laoder加载图片
        //  {
        //   test: /\.(jpg|png|jpeg|gif|svg)$/,
        //     use: ['file-loader']
        // }
      ]
    },
    // resolve: {//在webpack.config.js中新增resolve节点，写入如下代码
    //   //省略后缀名
    //   extensions: ['*', '.js', '.jsx', '.json'],
    //   // 配置路径别名
    //   alias: {
    //       '@assets': path.resolve('./src/assets'),
    //       '@views': path.resolve('./src/views'),
    //       '@utils': path.resolve('./src/utils'),
    //       '@components': path.resolve('./src/components')
    //   },
    // },
    devServer: {
      port: 8080,
      host: '0.0.0.0',
    },
  }
}