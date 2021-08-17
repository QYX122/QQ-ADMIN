/*
 * @Author: your name
 * @Date: 2021-08-16 15:33:38
 * @LastEditTime: 2021-08-17 15:10:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /QQ-ADMIN/postcss.config.js
 */
const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        browsers: 'last 2 versions',
      }
    ],
    postcssNormalize(),
    require('autoprefixer') ({
      overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
    })
  ],
};
