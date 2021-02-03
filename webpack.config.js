const path = require('path')

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
};