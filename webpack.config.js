const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'postcss-loader', options: { sourceMap: isDevelopment } },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
