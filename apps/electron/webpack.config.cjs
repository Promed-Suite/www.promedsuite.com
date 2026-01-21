const path = require("node:path");
const TerserPlugin = require("terser-webpack-plugin");

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

/** @type { import('webpack').Configuration } */
module.exports = {
  mode: "production", // 'development'
  target: "electron-main", // Node.js
  devtool: false,
  entry: {
    main: "./dist-vite/index.mjs",
    // fileWorker: './dist-vite/fileWorker.mjs',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].mjs", // [name] chunk
    module: true, // ESM
    chunkFormat: "module", // ESM chunk
    library: {
      type: "module", // ES Module
    },
  },
  experiments: {
    outputModule: true, // ESM
  },
  // node_modules
  // ESM，externals 'module' 'node-commonjs'
  externals: {
    "font-list": "node-commonjs font-list",
    "http-proxy-middleware": "node-commonjs http-proxy-middleware",
  },
  externalsType: "node-commonjs", // Node.js CommonJS
  optimization: {
    moduleIds: "deterministic", // ID
    chunkIds: "deterministic", // chunk ID
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
        },
        extractComments: false, // LICENSE.txt
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2, // common chunk 中
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [],
};
