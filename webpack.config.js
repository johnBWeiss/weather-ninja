const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { svgToMiniDataURI } = require("mini-svg-data-uri");
const WebpackObfuscatorPlugin = require("webpack-obfuscator");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(), // Extract CSS into separate files
    // new WebpackObfuscatorPlugin({
    //   // rotateStringArray: true,
    //   // controlFlowFlattening: true,
    //   // deadCodeInjection: true,
    //   // stringArrayThreshold: 0.75,
    // }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|pdf|ico)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
        generator: {
          dataUrl: content => svgToMiniDataURI(content.toString()),
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Remove the unnecessary "*"
  },
};
