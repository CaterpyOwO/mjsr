module.exports = {
    entry: './src/mjsr.js',
    module: {
        rules: [
          { test: /\.glsl$/, use: 'raw-loader' }
        ]
      }
}