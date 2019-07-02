const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    devtool: '#eval-source-map',
    context: path.resolve('./src'),
    entry: {
        index: './index.js',
        success: './success.js',
        allPray: './allPray.js'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                },
                exclude: path.resolve('./src/sq.html')
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            template: './sq.html',
            filename: 'sq.html',
            title: "测试",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            template: './success.html',
            filename: 'success.html',
            chunks: ['success']
        }),
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            template: './allPray.html',
            filename: 'allPray.html',
            chunks: ['allPray']
        }),

    ]
}
