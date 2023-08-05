const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { svgToMiniDataURI } = require("mini-svg-data-uri");
const WebpackObfuscatorPlugin = require("webpack-obfuscator");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].js", // Use [name] placeholder to generate unique filenames for each entry point.
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./_redirects", to: "" },
        { from: "./manifest.json", to: "" },
        { from: "./public/favicon.ico", to: "" },
        { from: "./public/logo192.png", to: "" },
        { from: "./public/logo512.png", to: "" },
      ],
    }),
    // new WebpackObfuscatorPlugin({
    //   // rotateStringArray: true,
    //   // controlFlowFlattening: true,
    //   // deadCodeInjection: true,
    //   // stringArrayThreshold: 0.75,
    // }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles", // Change the chunk name to a unique value, like "styles"
          test: /\.s?css$/,
          chunks: "all",
          enforce: true,
        },
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          enforce: true,
        },
      },
    },
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
      directory: path.join(__dirname, "dist"),
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
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|pdf|ico)$/i,
        type: "asset/inline",
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
        generator: {
          dataUrl: (content) => svgToMiniDataURI(content.toString()),
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
};
