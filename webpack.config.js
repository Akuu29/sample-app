const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: {
    bundle: path.join(__dirname, "static/js", "client.tsx")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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