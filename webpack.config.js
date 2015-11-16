'use strict';

var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    target: 'web',
    entry: {
        app: './app/app.js'
    },
    output: {
        path: './build',
        pathInfo: true,
        // publicPath: '/',
        filename: '[name].js',
        // hash: true
    },
    module: {
        preLoaders: [
            // {test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules|bower_components/}
        ],
        loaders: [
            {test: /\.(js)$/,exclude: /node_modules|bower_components/,loader: 'babel-loader?loose=all'},
            // {test: /\.js$/, loader: 'jsx?harmony'},
            {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {test: /\.png$/, loader: 'url-loader?mimetype=image/png'},
            {test: /\.gif$/, loader: 'url-loader?mimetype=image/gif'},
            {test: /\.jpe?g$/, loader: 'url-loader?mimetype=image/jpeg'},
            {test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]'}
        ],
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extentions: ['js', 'jsx', 'css', 'less']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new ExtractTextPlugin("[name].css", {
            allChunks: true
        }),
        new BowerWebpackPlugin({
            modulesDirectories: ['bower_components'],
            manifestFiles:      "bower.json",
            includes:           /.*/,
            excludes:           [],
            searchResolveModulesDirectories: true
        }),
        new webpack.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

