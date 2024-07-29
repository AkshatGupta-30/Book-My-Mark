const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        popup: path.resolve("./src/addons/popup.tsx"),
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
        ...getHtmlPlugin(["popup"]),
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
            new HtmlPlugin({
                title: "Book My mark",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
