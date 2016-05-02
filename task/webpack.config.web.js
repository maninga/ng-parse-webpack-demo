const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const defaults = require('./webpack.config.defaults');

module.exports = Object.assign({}, defaults, {
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      './src/web/app/index.js',
    ],
  },

  output: Object.assign({}, defaults.output, {
    libaryTarget: 'var',
    path: path.join(defaults.context, 'dist/public'),
    pathinfo: true,
    publicPath: '/',
    sourceMapFilename: '[name].js.map',
  }),

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(defaults.plugins).concat([
    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([
      { from: 'src/web/assets',          to: 'assets' },
      { from: 'src/web/test-assets',     to: 'test-assets' },
      { from: 'src/web/vendor',          to: 'vendor' },
      { from: 'src/web/crossdomain.xml', to: 'crossdomain.xml' },
      { from: 'src/web/humans.txt',      to: 'humans.txt' },
      { from: 'src/web/index.html',      to: 'index.html' },
      { from: 'src/web/test.html',       to: 'test.html' },
    ]),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"development"`
      }
    }),
  ]),

  target: 'web',
});
