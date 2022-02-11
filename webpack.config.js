const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './demo/src/assettes/js/main.js',
  output: {
    // バンドル先
    filename: 'main.js',
    path: path.join(__dirname, 'demo/dist/assettes/js'),
  },
  optimization: {
    minimizer: [
      // js圧縮
      // new TerserPlugin({
      //   extractComments: 'all', // コメント削除
      //   terserOptions: {
      //     compress: {
      //       drop_console: true, // console.log削除
      //     },
      //   },
      // }),
    ],
  },
};
