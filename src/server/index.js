// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var webpack = require('webpack');
var client = require('../../task/webpack.config.web');
var compiler = webpack(client);

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  // liveQuery: {
  //   classNames: ['Posts', 'Comments'] // List of classes to support for query subscriptions
  // }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

console.log('server side reload');

// Serve static assets from the /public folder
app.use('/public', express.static(path.resolve(__dirname, '../public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
  // res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: client.output.publicPath,
  stats: {
    colors: true
  },
  quiet: false,
}));

app.use(require('webpack-hot-middleware')(compiler));


var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Running parse-server-example, listenning on port ' + port + '.');
});

// This will enable the Live Query real-time server
// ParseServer.createLiveQueryServer(httpServer);
