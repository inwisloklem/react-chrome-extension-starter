const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')

const outputPath = 'dist'

module.exports = {
  webpack(config) {
    const appDirectory = fs.realpathSync(process.cwd())
    config.entry = config.entry.filter(entry => !entry.includes('webpackHotDevClient'))
    config.output.path = path.resolve(appDirectory, outputPath)
    config.plugins = (config.plugins || []).concat([
      new CopyWebpackPlugin([{from: 'public'}], {ignore: ['*.html']}),
    ])
    return config
  },

  devServer(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      return {
        ...config,
        writeToDisk: true,
      }
    }
  },
}
