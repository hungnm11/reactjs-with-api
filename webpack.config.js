const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production'; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  loader: ['css-loader','sass-loader'],
                  publicPath: '/dist'
                });

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      }, {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: 'babel-loader'
      }, {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          //'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    // port: 9000, stats: "errors-only",
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      // minify: {     collapseWhitespace: true },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({title: 'Contact Page', hash: true, chunks: ['contact'], filename: 'contact.html', template: './src/contact.html'}),
    new ExtractTextPlugin({filename: 'app.css', disable: !isProd, allChunks: true}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}