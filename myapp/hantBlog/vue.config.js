module.exports = {
  devServer: {
    publicPath: './',
    productionSourceMap: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/index': ''
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
