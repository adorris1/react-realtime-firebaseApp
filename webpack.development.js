var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require('./webpack.config.js');
var compiler = webpack(config.development);



var server = new WebpackDevServer(compiler, {
  contentBase: "/build",
  hot: false,
  quiet: false,
  noInfo: false,
  lazy: false,
  filename: "bundle.js",
  publicPath: "/build/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});


server.listen(8080, "localhost", function(err) {
  if (err) {
    throw err;
  }

  console.log('Please wait for source code');
});
