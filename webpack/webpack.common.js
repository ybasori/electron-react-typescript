const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "../public/assets"),
    clean: true,
    filename: "js/main.js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      src: path.resolve(__dirname, "../src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][hash][ext]",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
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
};