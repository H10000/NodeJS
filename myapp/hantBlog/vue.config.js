module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    // host: "localhost",
    // port: 8080, // 端口号
    // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      '/api/': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/index': ''
        }
      }
    }
  }
}
