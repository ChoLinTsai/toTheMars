const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

// const isProd = process.env.NODE_ENV === 'production'; //true | false
// const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
// const cssProd = ExtractTextPlugin.extract({
// 									fallback: 'style-loader',
// 									use: ['css-loader', 'sass-loader'],
// 								});
// const cssConfig = isProd ? cssProd : cssDev;



module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: './js/app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: ['css-loader', 'sass-loader'],
						})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							publicPath: '../',
							outputPath: 'img/'
						}
					},
					{
						loader: "image-webpack-loader"
					}
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
	  compress: true,
		// hot: true,
		stats: "errors-only",
		// open: true
	},
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			title: 'HTML Webpack Templete',
			template: './src/index.html',
			hash: true,
			minify: {
				collapseWhitespace: false
			}
		}),
		new ExtractTextPlugin({
			filename: './css/app.css',
			disable: false,
			allChunks: true
		})
	]
}
