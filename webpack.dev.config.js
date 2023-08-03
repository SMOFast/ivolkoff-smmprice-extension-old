var path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.config');

config.devtool = 'source-map';
config.plugins.push(new webpack.LoaderOptionsPlugin({debug: true}));
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

module.exports = config;