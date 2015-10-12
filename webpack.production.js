var webpack = require('webpack');
var config = require('./webpack.config.js');

webpack(config.production, function(err, stats) {
  if (err) {
    throw err;
  }

  console.log(stats.toString({
    colors: true
  }));
});
