/*
 * @Author: your name
 * @Date: 2021-08-16 14:45:45
 * @LastEditTime: 2021-08-17 17:33:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /QQ-ADMIN/webpack.common.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;


module.exports = (env) => {
  return {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
      index: './src/index.js'
    },
    output: {
      // 打包文件根目录
      path: path.resolve(__dirname, "dist/"),
      filename: '[name].bundle.js',
    },
    plugins: [
      // 生成 index.html
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '铁木真大屏展示',
        filename: "index.html",
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new friendlyErrorsWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
             presets: ['@babel/preset-env'],
            },
          }
        },
        {
          test: /\.css$/i,                                                                                                                                                             
          use: ["style-loader", "css-loader"],                                                                                                                          
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
        //// Images
        {
          test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        //解析字体文件的loader配置
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
         },
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
      historyApiFallback: true,
      contentBase: path.join(__dirname, './dist'),
      open: true,
      hot: true,
      quiet: true,
      port: 8082,
      proxy: {
        // 接口代理
        '/api': {
          target: 'http://localhost:9000/', 
          changeOrigin: true,
          pathRewrite: {
              "/api": ""
          },
          secure: false,
          auth: false,
          logLevel: 'debug',
        },
      },
    },
  }
}