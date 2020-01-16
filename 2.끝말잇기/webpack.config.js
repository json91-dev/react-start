const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: {
    app: ['./client'],
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/, //js와 jsx파일에 룰을 적용하겠다.
      loader: 'babel-loader', // 최신 문법을 지원하도록 babel을 지원한다.
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }]

  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }
}
