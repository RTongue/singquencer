'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  watch: true,
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
