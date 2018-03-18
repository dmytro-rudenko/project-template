var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
module.exports = function(env) {
    return {
        entry: "./src/main.js",
        output: {
            path: __dirname + "/",
            filename: "js/bundle.js"
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
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
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
                                browsers:['ie >= 8', 'last 4 version']
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
            new ExtractTextPlugin('css/main.css')
        ]
    }
}