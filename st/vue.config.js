const { domainConfig } = require('./src/lib/config.js')
const UglifyPlugin = require("uglifyjs-webpack-plugin");
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const path = require("path");
const Timestamp = new Date().getTime();
const isPro = process.env.NODE_ENV === "production" ? true : false;
const pageName = process.env.pageName;
const domain = domainConfig[pageName];
const cdn = {
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js",
    // "https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js",
    // "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
  ],
};
function resolve(dir) {
  return path.join(__dirname, dir);
}
const pages = {};
pageName === "signUp" &&
  (pages.signUp = {
    // 入口文件
    entry: "./src/main.js" /*这个是根入口文件*/,
    // 模板文件
    template: "public/index.html",
    // 输出文件
    filename: "signUp.html",
    // 页面title
    title: "ST 报名",
    chunks: ["chunk-vendors", "chunk-common", "signUp"],
  });
  pageName === "fruit" &&
  (pages.fruit = {
    // 入口文件
    entry: "./src/main.js" /*这个是根入口文件*/,
    // 模板文件
    template: "public/index.html",
    // 输出文件
    filename: "fruit.html",
    // 页面title
    title: "ST 果子统计",
    chunks: ["chunk-vendors", "chunk-common", "fruit"],
  });
module.exports = {
  lintOnSave: true,
  publicPath: "./",
  outputDir: "dist",
  pages,
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        target: domain, //代理接口
        // target: 'http://192.168.0.248:8080/lop',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //代理的路径
        },
      },
    },
  },
  chainWebpack: (config) => {
    if (isPro) {
      // config.plugin('prefetch').tap(options => {
      //   options[0].fileBlacklist = options[0].fileBlacklist || []
      //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      //   return options
      // })
      config.output.filename(`[name].[hash]${Timestamp}.js`).end();
      config.output.chunkFilename(`[name].[hash]${Timestamp}.js`).end();
      config.plugin("extract-css").tap((args) => [
        {
          filename: `css/[name][hash]${Timestamp}.css`,
          chunkFilename: `css/[name][hash]${Timestamp}.css`,
        },
      ]);
    }
    config
      .plugin("define") // pageName 全局使用
      .tap((args) => {
        args[0].pageConfig = JSON.stringify({
          pageName,
          domain: domainConfig[pageName]
        });
        return args;
      });
    /* config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      args[0].chunksSortMode = "none";
      return args;
    }); */
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: (config) => {
    let externals = {
      vue: "Vue",
      // vuex: "Vuex",
      // "vue-router": "VueRouter",
      Axios: "axios",
    };
    Object.assign(config, { externals });
    // if (process.env.NODE_ENV === 'production') {
    // 将每个依赖包打包成单独的js文件
    let optimization = {
      minimizer: [
        new UglifyPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_console: true, // console
              drop_debugger: true,
              pure_funcs: ["console.log"], // 移除console
            },
          },
        }),
      ],
    };
    Object.assign(config, {
      optimization,
    });
    // config.plugins = config.plugins.concat([new WebpackBundleAnalyzer.BundleAnalyzerPlugin(), new LodashModuleReplacementPlugin()]);
    config.plugins = config.plugins.concat([
      new LodashModuleReplacementPlugin(),
    ]);
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_variable.scss";
        `,
      },
    },
  },
};
