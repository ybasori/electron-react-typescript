const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "./assets/"   // ✅ THIS IS THE KEY
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      templateContent: `
      <!DOCTYPE html>
      <html>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `,
    }),
  ],
});