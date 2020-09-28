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
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js",
    "https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js",
    "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
  ],
};
const isPro = process.env.NODE_ENV === "production" ? true : false;
const appName = process.env.appName;
const output = appConfig[process.env.appName].output;
module.exports = {
  lintOnSave: true,
  publicPath: "./",
  outputDir: output,
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        target: `http://www.landofpromise.co:8080/${appConfig[appName].apiPrefix
          }/api`, //代理接口
        // target: `http://192.168.0.100:8080/api`,   //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/", //代理的路径
        },
      },
    },
  },
  productionSourceMap: isPro ? false : true,
  chainWebpack: (config) => {
    config.resolve.symlinks(true);
    if (isPro) {
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
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("mixins", resolve("src/mixins"))
      .set("utils", resolve("src/utils"))
      .set("api", resolve("src/api"))
      .set("views", resolve("src/views"))
      .set("lib", resolve("src/lib"));
    config
      .plugin("define") // appConfig 全局使用
      .tap((args) => {
        args[0].appConfig = JSON.stringify(appConfig[appName]);
        args[0].isPro = isPro;
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
    config.devtool = "source-map";
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
