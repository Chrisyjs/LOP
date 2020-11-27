const UglifyPlugin = require("uglifyjs-webpack-plugin");
const appConfig = require("./appConfig");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
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
const appName = process.env.appName || "iAppointment";
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
  productionSourceMap: isPro ? false : true,
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
    } else {
      // config.module.rule("js").exclude.add(/node_modules/).end().use("babel-loader").loader('babel-loader');
    }
    config.resolve.alias.set("@", resolve("src"));
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
    /* prod start */
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
        // 分割代码块
        // splitChunks: {
        //   chunks: "all",
        //   /**
        //    * initial 入口 chunk，对于异步导入的文件不处理
        //       async 异步 chunk，只对异步导入的文件处理
        //       all 全部 chunk
        //    */

        //   // 缓存分组
        //   cacheGroups: {
        //     // 第三方模块
        //     vendor: {
        //       name: "vendor", // chunk 名称
        //       priority: 1, // 权限更高，优先抽离，重要！！！
        //       test: /node_modules/,
        //       minSize: 0, // 大小限制
        //       minChunks: 1, // 最少复用过几次
        //     },

        //     // 公共的模块
        //     common: {
        //       name: "common", // chunk 名称
        //       priority: 0, // 优先级
        //       minSize: 0, // 公共模块的大小限制
        //       minChunks: 2, // 公共模块最少复用过几次
        //     },
        //   },
        // },
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
      config.plugins = config.plugins.concat([
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
      ]);
      /* prod end */
    } else {
      // config.plugins = config.plugins.concat([
      //   // 第三，告诉 Webpack 使用了哪些动态链接库
      //   new DllReferencePlugin({
      //     // 描述 vue 动态链接库的文件内容
      //     manifest: require(path.join(
      //       resolve("dist_dll"),
      //       "vendor.manifest.json"
      //     )),
      //   }),
      //   new AddAssetHtmlPlugin({
      //     // dll文件位置
      //     filepath: path.resolve(__dirname, "./dist_dll/*.js"),
      //     // dll 引用路径
      //     publicPath: "./dist_dll",
      //     outputPath: "./dist_dll", // 输出的目录地址
      //   }),
      // ]);
    }

    config.plugins = config.plugins.concat([
      new ProgressBarPlugin({
        format:
          " build [:bar] " +
          chalk.green.bold(":percent") +
          " (:elapsed seconds)",
        clear: false,
      }),
    ]);
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
