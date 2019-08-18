var path = require('path');
var webpack = require('webpack');
var WebpackBN = require('webpack-build-notifier');

var join = path.join;

var PATHS = {
  lib: join(__dirname, 'lib'),
  dist: join(__dirname, 'dist'),
};

module.exports = {
  mode: 'development',
  entry: {
    wale: join(PATHS.lib, 'index.ts'),
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'wale'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
    }],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new WebpackBN({
      title: 'Wale'
    }),
    new webpack.IgnorePlugin(/test\.ts$/),
  ],
};
