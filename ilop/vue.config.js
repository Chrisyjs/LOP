
module.exports = {
  lintOnSave: true,
 
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://www.landofpromise.co:8080/lop_project',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '/'    //代理的路径
        }
      }
    }
  }
}