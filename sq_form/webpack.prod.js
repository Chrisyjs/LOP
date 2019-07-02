const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            'processs.env': '"production"',
            'api_prefix': '"http://ajuntechhome.cn"'
        }),
        new CleanWebpackPlugin(
            ['dist']
        )
    ]

})
