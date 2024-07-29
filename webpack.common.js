const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: {
		popup: path.resolve("./src/addons/popup.tsx"),
		options: path.resolve("./src/addons/options.tsx"),
		newtab: path.resolve("./src/addons/newtab.tsx"),
	},
	module: {
		rules: [
			{
				use: "ts-loader",
				test: /\.tsx?$/,
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve("src/manifest.json"),
					to: path.resolve("dist"),
				},
				{
					from: path.resolve("src/assets/"),
					to: path.resolve("dist/assets/"),
				},
			],
		}),
		new Dotenv(),
		...getHtmlPlugin(["popup", "options", "newtab"]),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].js",
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
};

function getHtmlPlugin(chunks) {
	return chunks.map(
		(chunk) =>
			new HtmlWebpackPlugin({
				title: chunk === "newtab" ? "New Tab" : "Book My mark",
				filename: `${chunk}.html`,
				chunks: [chunk],
			}),
	);
}
