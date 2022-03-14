const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

const MODE = "development";

module.exports = {
  mode: MODE,
  entry: ["./src/client/js/index.js", "./src/client/scss/styles.scss"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/index.js",
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devtool: MODE === "development" ? "source-map" : "",
};
