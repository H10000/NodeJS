const isProdection = process.env.NODE_ENV === 'production' //生成环境
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    // host: "localhost",
    //port: 8080, // 端口号
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
  },
  configureWebpack: config => {
    console.log(isProdection);
    if (isProdection) {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
      }
      // 打包生产.gz包
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  chainWebpack: config => {
    if (isProdection) {
      config
        .plugin('html')
        .tap(args => {
          args[0].template = './public/index_pro.html'
          return args
        })
    } else {
      config
        .plugin('html')
        .tap(args => {
          args[0].template = './public/index_dev.html'
          return args
        })
    }

  }
}
