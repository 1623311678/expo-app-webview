/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackBar = require("webpackbar")
const os = require("os")
const HappyPack = require("happypack")
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const CopyPlugin = require("copy-webpack-plugin")

const createHappyPlugin = (id, loaders) =>
  new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: process.env.HAPPY_VERBOSE === "1" // make happy more verbose with HAPPY_VERBOSE=1
  })

const pathsPlugin = new TsconfigPathsPlugin({
  configFile: path.resolve(__dirname, "../tsconfig.json")
})

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/app.tsx")
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    plugins: [pathsPlugin],
    alias: {
      "@src": path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "happypack/loader?id=happybabel",
        // options: { 使用happypack, 需要把options写到对应的plugin里
        //   configFile: resolve("./babel.config.js")
        // },
        test: /\.(jsx?|tsx?)$/
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    createHappyPlugin("happybabel", [
      {
        loader: "babel-loader",
        options: {
          babelrc: true,
          configFile: path.resolve(__dirname, "../babel.config.js"),
          cacheDirectory: true // 启用缓存
        }
      }
    ]),
    new HtmlWebpackPlugin({
      title: "fitshop",
      template: path.resolve(__dirname, "../public/index.html"), // 源模板文件
      filename: "index.html"
    }),
    // 把public中的文件复制到dist文件中
    new CopyPlugin([
      {
        // 从public中复制文件
        from: path.resolve(__dirname, "../public"),
        // 把复制的文件存放到dis里面
        to: path.resolve(__dirname, "../dist")
      }
    ])
  ]
}
