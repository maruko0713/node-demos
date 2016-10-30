'use strict';

var path  = require("path");
var webpack = require("webpack");

module.exports = {
	devtool: "#source-map",
	colors:true,
	progress:true,
	// 入口文件
	entry: {
		app:'./app/public/js/app.js',
	},
	// 编译后输出文件
	output: {
		path:path.join(__dirname,'app/public/js/dest'),
		filename:'[name].js',
	},
	module: {
		// 调用babel-loader编译react组件
		loaders: [{
			loader: 'babel-loader',
			include: [
				path.resolve(__dirname,'app/public/js')
			],
			test:/\.jsx?$/,
			query:{
				plugins:[],
				presets:['es2015','react'],
			},
		}],
	},
	plugins: [
	    // 压缩代码
		new webpack.optimize.UglifyJsPlugin()
	]
}