# ng-parse-webpack-demo

Example project heavily inspired by https://github.com/ParsePlatform/parse-server-example, https://github.com/Foxandxss/angular-webpack-workflow and many others amazing projects I could find, using

* [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.
* [angular](https://www.angularjs.org) module browser side.
* [webpack](https://webpack.github.io) module bundler.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide, AngularJs developer guide here: https://docs.angularjs.org/guide and Webpack documentation here: https://webpack.github.io/docs/

### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Install ngrok and you can test with devices

