const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: [
        path.join(__dirname, 'src/app.ts'),
        //path.join(__dirname, 'style/main.less')
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: /\.less$/,
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader'},
                { loader: 'less-loader' }
              ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },  
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static' }
        ])
    ]
};