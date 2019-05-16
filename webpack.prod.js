/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packagejson = require("./package.json");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.resolve('src'),
          path.resolve('node_modules/vuetify/'),
          path.resolve('node_modules/material-design-icons-iconfont/'),
          path.resolve('node_modules/@fortawesome/'),
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new AppManifestWebpackPlugin({
      logo: '@/assets/img/favicon-tmpl.png',
      inject: true,
      emitStats: true,
      prefix: '/icons/',
      output: './icons/',
      config: {
        appName: packagejson.fullname,
        appDescription: packagejson.description,
        developerName: packagejson.author,
        background: '#fff',
        theme_color: "#fff",
        version: packagejson.version,
        lang: 'es-ES',
        start_url: '/',
      },
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src'),
      to: path.resolve(__dirname, 'dist'),
      toType: 'dir'
    }]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
});
