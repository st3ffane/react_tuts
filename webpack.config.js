module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: './dist/[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
devServer: {
    hot: true,
    publicPath: '/',
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      }
    },
  },
}
