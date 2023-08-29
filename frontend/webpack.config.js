const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./Src/app.js",
    mode: "development",
    output: {
        filename: "start.js",
        path: path.resolve(__dirname, "docs"),
        clean: true
    },
    devServer: {
        static: '.docs',
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                {from: "Templates", to: "Templates"},
                {from: "Styles", to: "Styles"},
                {from: "Static/Images", to: "Images"},
            ],
        }),
    ],
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: {
    //                 loader: "babel-loader",
    //                 options: {
    //                     presets: [
    //                         "@babel/preset-env"
    //                     ]
    //                 }
    //             }
    //         }
    //     ]
    // },
};