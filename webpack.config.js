const Html = require("html-webpack-plugin");
const Extract = require("extract-text-webpack-plugin");
const Dashboard = require("webpack-dashboard/plugin");
const Copy = require("copy-webpack-plugin");
const Uglify = require("uglifyjs-webpack-plugin");
const Cleanup = require("clean-webpack-plugin");
const Webpack = require("webpack");
const Notify = require("webpack-notifier");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const Monitor = require("webpack-monitor");
const Jarvis = require("webpack-jarvis");
const BrowserSync = require('browser-sync-webpack-plugin')

require("dotenv").config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030; //change
const PROXY = `http://${HOST}:${PORT}`;

const ENV = process.env.ENV;
const isDevelopment = ENV === "development";
const isProduction = ENV === "production";

function setDevTool() {
  // function to set dev-tool depending on environment
  if (isDevelopment) {
    return "eval-source-map";
  } else if (isProduction) {
    return "source-map";
  } else {
    return "eval-source-map";
  }
}

const config = {
  devtool: setDevTool(),

  entry: {
    app: __dirname + "/src/js/index.js",
    riot: __dirname + "/src/riot/index.js",
    vendors: ["umbrellajs", "validate", "smooth-scroll", "riot"]
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].js",
    publicPath: "/"
  },
  devServer: {

    host: HOST,
    port: PORT,
    contentBase: __dirname + "/dist"

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {}
      },
      {
        test: /\.html/,
        loader: "raw-loader"
      },
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: "riot-tag-loader"
      },
      {
        test: /\.scss$/,
        use: Extract.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: isProduction
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new Extract("css/[name].min.css"),
    new Html({
      template: __dirname + "/src/index.html",
      inject: "body",
      title: "BlackTie"
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: "vendors"
    }),
    new BrowserSync(
      // BrowserSync options
      {
        host: HOST,
        port: PORT,
        proxy: PROXY
      }
    ),
    new Copy([

    ])
  ],

};

// Minify and copy assets in production
// plugins to use in a production environment
if (isProduction) {
  config.plugins.push(
    new Uglify(),
    new Webpack.DefinePlugin({
      "process.env": { NODE_ENV: '"production"' }
    }),
    new Notify({
      title: "BlackTie Notifications",
      message: "Production bundled successfully. You are ready to party",
      sound: true
    })
  );
}

if (isDevelopment) {
  config.plugins.push(new Dashboard());
}

module.exports = config;
