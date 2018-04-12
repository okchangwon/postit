const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'postit.[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/js",
    port: 9000,
    open: true
  }
};