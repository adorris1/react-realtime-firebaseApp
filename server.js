var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  open = require("open"),
  port = 8090,
  args = process.argv[2],
  WebpackDevServer = require("webpack-dev-server"),
  webpack = require("webpack"),
  config = require('./webpack.config'),
  compiler = webpack(config.development),
  serverInstance = null;

var serverLocal = function () {
  serverInstance = http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }).listen(parseInt(port, 10), '127.0.0.1', function(){
    console.log('Launching the browser!');
    var append = '';
    if (args === '-dev') {
      append = '/dev.html';
      console.log("Static file server running at\n  => http://localhost:" + port + "/dev.html\nCTRL + C to shutdown");
    }else {
      console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
    }
    open('http://127.0.0.1:' + port + append);
  });
};
if (args === '-dev') {
  compiler.plugin("done", function() {
    if(!serverInstance) serverLocal();
  });
  console.log('STARTING DEV SERVER');
  var server = new WebpackDevServer(compiler, {
    contentBase: "/build",
    hot: true,
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
}else if(args === '-build'){
  console.log('STARTING BUILDING.....');
  webpack(config.production, function(err, stats) {
    if (err) {
      throw err;
    }
    console.log(stats.toString({
      colors: true
    }));
    serverLocal();
  });
}



