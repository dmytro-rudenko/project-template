const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
module.exports = function (env) {
    return {
        entry: './src/main.js',
        output: {
            path: __dirname + '/',
            filename: 'js/bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        filename: '[name].min.css',
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {url: false, minimize: true}
                        },
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /\.scss$/,
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                }]
        },
        stats: {
            // Colored output
            colors: true
        },
        plugins: [
            new ExtractTextPlugin('css/main.min.css'),
        ],

    }
};