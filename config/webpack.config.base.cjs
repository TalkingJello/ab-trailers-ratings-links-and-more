const path = require("path");
const webpack = require("webpack");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const siteTarget = process.env.SITE_TARGET || "ab";

const webpackConfig = {
  resolve: {
    extensions: [".js", ".ts"],
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  target: "web",
  externals: {
    jquery: "$",
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      SITE_TARGET: JSON.stringify(siteTarget),
    }),
    ...(process.env.npm_config_report ? [new BundleAnalyzerPlugin()] : []),
  ],
};

module.exports = webpackConfig;
