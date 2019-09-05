
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