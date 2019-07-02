const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
    devServer: {
        port: 8080,
        inline: true,
        index: 'sq.html',
        proxy: {
            '/host1': {
                target: 'http://ajuntechhome.cn',
                changeOrigin: true,
                pathRewrite: {"^/host1" : ""}
            },
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'processs.env': '"development"',
            'api_prefix': '"/host1"'
        })
    ],
})
