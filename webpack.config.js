const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.s[ca]ss$/, loader: ["style-loader", "css-loader", "sass-loader"] }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 2333
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: path.join(__dirname, "src/index.html"),
        }
    )]
}