const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = function(env) {
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
            presets: ['@babel/preset-env', 'minify']
          }
        }
      }, {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }, {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          filename: '[name].min.css',
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { url: true, import: true }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                cssnano({
                  preset: 'default',
                }),
                autoprefixer({
                  browsers: ['last 4 version']
                })
              ],
              sourceMap: true
            }
          }, 'sass-loader']
        })
      }]
    },
    stats: {
      // Colored output
      colors: true
    },
    plugins: [
      new ExtractTextPlugin('css/main.min.css'),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],

  }
};