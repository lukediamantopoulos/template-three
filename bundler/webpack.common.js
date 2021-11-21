const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, "../src/js/index.js"),
	output: {
		hashFunction: "xxhash64",
		filename: "bundle.js",
		path: path.resolve(__dirname, "../dist"),
	},
	devtool: "source-map",
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: path.resolve(__dirname, "../static") }],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../src/index.html"),
			minify: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: ["html-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.glsl$/,
				loader: "webpack-glsl-loader",
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[hash][ext]",
				},
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[hash][ext]",
				},
			},
		],
	},
};
