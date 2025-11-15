const { merge } = require("webpack-merge");
const UserScriptMetaDataPlugin = require("userscript-metadata-webpack-plugin");

const metadata = require("./metadata.cjs");
const webpackConfig = require("./webpack.config.base.cjs");

const siteTarget = process.env.SITE_TARGET || "ab";

const cfg = merge(webpackConfig, {
  mode: "production",
  output: {
    filename: `${siteTarget === "ab" ? "index" : siteTarget}.prod.user.js`,
  },
  optimization: {
    minimize: false,
  },
  cache: {
    type: "filesystem",
    name: `prod-${siteTarget}`,
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
});

module.exports = cfg;
