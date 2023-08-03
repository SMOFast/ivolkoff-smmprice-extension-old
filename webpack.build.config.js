var path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.config');

config.output.path = path.resolve(__dirname, './build/js');
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
        warnings: false
    }
}));

module.exports = config;