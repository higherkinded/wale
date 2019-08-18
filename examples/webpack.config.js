var path = require('path');
var fs = require('fs');
// var webpack = require('webpack');

var rootDir = fs.realpathSync(process.cwd());
var resolve = rel => path.resolve(rootDir, rel);

module.exports = {
  entry: resolve('index.tsx'),
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3001,
    contentBase: resolve('public'),
    compress: false,
  },
  output: {
    path: resolve('public'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};
