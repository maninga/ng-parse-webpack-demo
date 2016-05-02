const webpack = require('webpack');
const ReloadServerPlugin = require('reload-server-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const defaults = require('./webpack.config.defaults');

module.exports = Object.assign({}, defaults, {
  entry: {
    index: './src/server/index.js',
  },

  externals: [
    (ctx, req,  cb) => {
      if (/^\.\//.test(req)) return cb();
      cb(null, `commonjs ${req}`);
    },
  ],

  // externals: defaults.externals.concat([
  //   // Every non-relative module is external
  //   /^[a-z\-0-9]+$/,
  // ]),

  output: Object.assign({}, defaults.output, {
    libraryTarget: 'commonjs2',
    path: path.join(defaults.context, 'dist/server'),
    pathinfo: true,
    sourceMapFilename: '[name].js.map',
  }),

  plugins: defaults.plugins.concat([
    new ReloadServerPlugin({
      script: 'dist/server/index.js',
    }),

    // pas sur que ce soit vraiment utile mais dans le doute ... pour l'instant
    new webpack.DefinePlugin({
      rootDir: `"${path.resolve(__dirname, '..')}"`,
    }),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([
      { from: 'src/server/cloud', to: 'cloud' },
      // { from: 'src/web',          to: 'public' }
    ]),

  ]),

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },
});
