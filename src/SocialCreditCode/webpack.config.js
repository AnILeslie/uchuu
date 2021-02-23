const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './main/app.js',
    mode: 'production',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(), // 清空dist目录
        new CopyWebpackPlugin({ // 复制文件
            patterns: [{
                from: "index.html",
                to: "index.html"
            },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'style-loader', 'css-loader', 'less-loader'
                ]
            },
        ]
    }
}