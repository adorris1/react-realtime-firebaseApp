const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const production = exports.production = {
  entry: {
    app:[path.resolve(__dirname, 'es6/main.jsx')],
    vendor: ['lodash', 'jquery']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$|.jsx$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions' },
      { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!less-loader' },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, exclude: /node_modules/, loader: 'html-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  progress: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    }),
    // print a webpack progress
    new webpack.ProgressPlugin(function(percentage, message) {
      var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
      var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
      process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
    })
  ],
  devtool: 'source-map'
};

exports.development = _.extend({}, production, {
  module: {
    preLoaders: production.module.preLoaders,
    loaders: production.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel', 'react-hot'],
      include: [new RegExp(path.join(__dirname, 'src'))]
    })
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery"
      }),
      // print a webpack progress
      new webpack.ProgressPlugin(function(percentage, message) {
        var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
        var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
        process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
      })
    ],
    watch: true
});