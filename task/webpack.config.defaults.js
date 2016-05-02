const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const NotifierPlugin = require('webpack-notifier');

module.exports = {
  context: process.cwd(),

  externals: [],

  module: {
    preLoaders: [
      { test: /\.js$/,    exclude: /(node_modules|cloud)/,    loader: 'eslint' },
    ],
    loaders: [
      { test: /\.css$/,                               loader: 'style' },
      { test: /\.css$/,                               loader: 'css', query: { localIdentName: '[name]-[local]--[hash:base64:5]' } },
      { test: /\.eot$/,                               loader: 'file' },
      { test: /\.js$/,    exclude: /node_modules/,    loader: 'babel', query: { cacheDirectory: true } },
      { test: /\.json$/,  exclude: /node_modules/,    loader: 'json' },
      { test: /\.(png|jpg)$/,                         loader: 'url', query: { limit: 8192 } }, // Inline base64 URLs for <= 8K images
      { test: /\.svg$/,                               loader: 'url', query: { mimetype: 'image/svg+xml' } },
      { test: /\.ttf$/,                               loader: 'url', query: { mimetype: 'application/octet-stream' } },
      { test: /\.(woff|woff2)$/,                      loader: 'url', query: { mimetype: 'application/font-woff' } },
    ],
  },

  output: {
    chunkFilename: '[id].[hash:5]-[chunkhash:7].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new NpmInstallPlugin({ save: true }),
    new NotifierPlugin({ alwaysNotify: true }),
  ],

  resolve: {
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },
};
