const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: ['css-loader','sass-loader'],
                        publicPath: '/dist'
                    }
                )
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
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
        // port: 9000,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true,
        })
    ]
}