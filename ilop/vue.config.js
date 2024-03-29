const UglifyPlugin = require("uglifyjs-webpack-plugin");
const appConfig = require("./appConfig");
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir); // 这里采用一个点，因为vue.config.js文件和package.json文件都在同一个目录下，即根目录下
}
const Timestamp = new Date().getTime();

const cdn = {
  js: [
    ["vue", "2.6.10"],
    ["axios", "0.19.0-beta.1"],
    ["vuex", "3.1.1"],
    ["vue-router", "3.1.3"],
  ].map(item => `https://unpkg.com/${item[0]}@${item[1]}/dist/${item[0]}.min.js`),
};
const isPro = process.env.NODE_ENV === "production" ? true : false;
const appName = process.env.appName || 'iAppointment';
const domain = isPro
  ? `http://landofpromise.co:8080/${appConfig[appName].apiPrefix}/api`
  : "/api";
const output = appConfig[appName].output;
module.exports = {
  lintOnSave: true,
  publicPath: "./",
  outputDir: output,
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        target: `http://landofpromise.co:8080/${appConfig[appName].apiPrefix}/api`, //代理接口
        // target: `http://192.168.0.100:8080/api`,   //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/", //代理的路径
        },
      },
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.symlinks(true);
    if (isPro) {
      // https://blog.csdn.net/weixin_41855143/article/details/103427765
      config.plugin("prefetch").tap((options) => {
        options[0].fileBlacklist = options[0].fileBlacklist || [];
        options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
        return options;
      });
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
      config.output.filename(`[name].[hash]${Timestamp}.js`).end();
      config.output.chunkFilename(`[name].[hash]${Timestamp}.js`).end();
      config.plugin("extract-css").tap((args) => [
        {
          filename: `css/[name][hash]${Timestamp}.css`,
          chunkFilename: `css/[name][hash]${Timestamp}.css`,
        },
      ]);
    }
    config.resolve.alias
      .set("@", resolve("src"))
    config
      .plugin("define") // appConfig 全局使用
      .tap((args) => {
        args[0].appConfig = JSON.stringify(appConfig[appName]);
        args[0].isPro = isPro;
        args[0].domain = JSON.stringify(domain);
        // args[0].test = 'alert(123)';
        // args[0].test = {1: 2};
        // args[0].test = () => console.log(123);
        // args[0].test = true;
        return args;
      });
    config.plugin("html").tap((args) => {
      args[0].appConfig = appConfig[appName];
      return args;
    });
  },
  configureWebpack: (config) => {
    if (isPro) {
      let externals = {
        vue: "Vue",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        Axios: "axios",
      };
      Object.assign(config, { externals });
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
    }
    config.devtool = isPro ? '' : "source-map";
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        data: `
          @import "@/assets/styles/_variable.scss";
        `,
      },
    },
  },
};
