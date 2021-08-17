module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }], //runtime: "automatic"可以在js和jsx 文件中自动识别是否需要引入react简化我们的开发
  ],
};