const { domainConfig } = require('./src/lib/config.js')
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const Timestamp = new Date().getTime();
const isPro = process.env.NODE_ENV === "production" ? true : false;
const pageName = process.env.pageName;
const domain = domainConfig[pageName];
const cdn = {
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js",
    "https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js",
  ],
};
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  publicPath: "./",
  outputDir: "dist",
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        target: domain, //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //代理的路径
        },
      },
    },
  },
  chainWebpack: (config) => {
    if (isPro) {
      config.plugin('prefetch').tap(options => {
        options[0].fileBlacklist = options[0].fileBlacklist || []
        options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
        return options
      })
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
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      args[0].chunksSortMode = "none";
      return args;
    });
    config.plugin("html").tap((args) => {
      args[0].pageName = pageName;
      return args;
    });
    config.resolve.alias.set("@", resolve("src"));
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
    }
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
