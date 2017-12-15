const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')

const cssConfig = ExtractTextPlugin.extract({
									fallback: 'style-loader',
									use: ['css-loader', 'sass-loader'],
									publicPath: './dist/css'
								});



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
				use: cssConfig
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'HTML Webpack Templete',
			template: './src/index.html',
			hash: true,
			minify: {
				collapseWhitespace: false
			}
		}),
		new ExtractTextPlugin({
			filename: './css/[name].css',
			disable: false,
			allChunks: true
		})
	]
}
