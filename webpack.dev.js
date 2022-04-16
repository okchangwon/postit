const path = require("path");
const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    devtool: "inline-source-map",
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             loader: "eslint-loader",
    //         },
    //     ],
    // },
    plugins: [new ESLintPlugin()],
    devServer: {
        static: [
            {
                directory: path.join(__dirname),
            },
        ],

        port: 9000,
        open: true,
    },
});
