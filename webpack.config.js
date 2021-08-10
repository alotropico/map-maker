const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, options) => {
  // Test webpack 4.x pass enviroment variables
  //console.log('env = ', env)
  //console.log('options.mode = ', options.mode)

  // Pass variables in to pug files (https://www.npmjs.com/package/pug-html-loader)
  // 1. Method 1: add 'options.data' in pug-html-loader to pass into pug
  // 2. Method 2: add 'templateParameters' in HtmlWebpackPlugin config to
  //    pass variable into pug
  // Pass variables into Sass/SCSS (https://www.npmjs.com/package/sass-loader#additionaldata)
  // - add 'options.additionalData' in sass-loader to pass variables
  const _gParams = {
    FILE_PREFIX: (options.mode === 'production') ? '/dist/' : '/',
  }

  var config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: [
        './js/index.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].js?[hash:8]'
    },
    devServer: {
      compress: true,
      port: 3001,
      stats: {
        assets: true,
        cached: false,
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        versions: false,
        warnings: false
      }
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: false
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                data: _gParams,
                pretty: true
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
          /* use: [
            'style-loader', // Creates `style` nodes from JS strings
            'css-loader', // Translates CSS into CommonJS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                additionalData: "$env: '" + options.mode + "'; $imgPrefix: '" + _gParams.IMG_PREFIX_URL + "';"
              }
            }
          ] */
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader', // Creates `style` nodes from JS strings
            'css-loader' // Translates CSS into CommonJS
          ]
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[path][name].[ext]?[hash:8]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 100
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'data', to: 'data' },
          { from: 'images', to: 'images' }
        ]
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      // For single pug file
      new HtmlWebpackPlugin({
        template: './pug/index.pug',
        filename: 'index.html',
        inject: true,
        chunks: ['index'],
        templateParameters: _gParams,
        minify: false
        /*{
          sortAttributes: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeComments: true,
          removeAttributeQuotes: true
        }*/
      }),
      new MiniCssExtractPlugin({
        filename: "styles.css"
      })
    ]
  }

  return config
}
