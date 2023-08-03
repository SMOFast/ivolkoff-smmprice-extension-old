const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    stats: {
        colors: true,
        reasons: true
    },
    entry: {
        backend: './backend/app.js',
        popup: './popup/app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: '[name].bundle.js',
    },
    resolve: {
        alias: {
            jquery: 'jquery/src/jquery',
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ["url-loader?limit=80000"]
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader?name=./../img/[name].[ext]?[hash]&context=./src',
            },
        ],
    },
    plugins: [],
};