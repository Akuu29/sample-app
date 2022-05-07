const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: {
    bundle: path.join(__dirname, "static/js", "client.js")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      }
    ]
  },
  devServer: {
    static: {
      directory: "./static/bundle",
    }
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "static/bundle"),
  }
};