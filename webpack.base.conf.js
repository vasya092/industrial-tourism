const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')


const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname,'./dist '),
  assets: 'assets/'
}
const PAGES_DIR = `${PATHS.src}/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

const config = {
  externals: {
    paths: PATHS
  },
  entry: PATHS.src,
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].js`,
    publicPath: '/'
  },
  module: {
    rules: [
      pug,
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(
      {
        filename: `${PATHS.assets}css/[name].css`,
      }
    ),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` }
    ])

 ]
};
module.exports = config;