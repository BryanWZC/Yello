const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const frontConfig = {
    target: 'web',
    mode: 'development',
    watch: false,
    entry: {
        board: './src/board-index.js',
        guestBoard: './src/board-guest-index.js',
        login: './src/login-index.js',
        signUp: './src/sign-up-index.js',
        signUpError: './src/sign-up-error-index.js',
        userPage: './src/user-page-index.js',
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_component)/,
                loader: 'babel-loader',
                options: { 
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true,
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: ['url-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    }
};

const backConfig = {
    target: 'node',
    mode: 'production',
    entry: './server/server.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle-back.js'
    },
    externals: [nodeExternals()],
}

module.exports = frontConfig;