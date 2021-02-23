const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    target: "web",
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
});