const path = require("path");
const webpack = require("webpack");
const WebpackMessages = require('webpack-messages');
const WebpackBar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: "development",
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    },
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, "public"),
        filename: 'index.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
        port: 3000,
        compress: true,
        host: '0.0.0.0',
        open: false,
        hot: true,
        allowedHosts: "all",
        historyApiFallback: true,
        client: {
            progress: false,
            overlay: true
        },
        onListening: function (devServer)
        {
            if (!devServer)
            {
                throw new Error('webpack-dev-server is not defined');
            }

            const port = devServer.server.address().port;
            console.log('Listening on port:', port);
        },
    },
    devtool: "source-map",
    plugins: [
        new webpack.BannerPlugin(`Copyright 2022 NiWee Productions.`),
        new WebpackMessages({
            name: 'client',
            logger: str => console.log(`>> ${str}`)
        }),
        new WebpackBar({
            name: "Hosting Station",
            color: "#412f97",
            basic: false,
            profile: true,
            fancy: true,
            reporters: [
                'fancy',
            ],
        }),
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
};
