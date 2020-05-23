const UglifyPlugin = require('uglifyjs-webpack-plugin');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path');
const domain = `http://www.landofpromise.co:8080/lop`;
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  publicPath: './',
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: domain,   //代理接口
        // target: 'http://192.168.0.248:8080/lop',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''    //代理的路径
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
    config.resolve.alias
      .set('@', resolve('src'))
  },
  configureWebpack: (config) => {
    let externals = {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'Axios': 'axios'
    };
    Object.assign(config, { externals });
    // if (process.env.NODE_ENV === 'production') {
    // 将每个依赖包打包成单独的js文件
    let optimization = {
      minimizer: [new UglifyPlugin({
        uglifyOptions: {
          compress: {
            // warnings: false,
            drop_console: true, // console
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      })]
    }
    Object.assign(config, {
      optimization
    })
    // config.plugins = config.plugins.concat([new WebpackBundleAnalyzer.BundleAnalyzerPlugin(), new LodashModuleReplacementPlugin()]);
    config.plugins = config.plugins.concat([new LodashModuleReplacementPlugin()]);
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_variable.scss";
        `
      }
    }
  }
}
