const UglifyPlugin = require('uglifyjs-webpack-plugin');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const cdn = {
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js'
  ]
};
const isPro = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
  lintOnSave: true,
  publicPath: './',
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://www.landofpromise.co:8080/lop_project',   //代理接口
        // target: 'http://192.168.0.248:8080/lop',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '/'    //代理的路径
        }
      }
    }
  },
  productionSourceMap: isPro ? false : true,
  chainWebpack: config => {
    if (isPro) {
      config.plugin('prefetch').tap(options => {
        options[0].fileBlacklist = options[0].fileBlacklist || []
        options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
        return options
      })
      config.plugin('html')
      .tap(args => {
          args[0].cdn = cdn;
        return args;
      })
    }
  },
  configureWebpack: (config) => {
    if (isPro) {
      let externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'Axios': 'axios'
      };
      Object.assign(config, { externals });
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
    } 
    config.devtool = 'source-map';
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