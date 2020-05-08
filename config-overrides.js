const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')

const outputPath = 'dist'

module.exports = {
  webpack(config) {
    const appDirectory = fs.realpathSync(process.cwd())
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
        hot: false,
        inline: false,
        liveReload: false,
        writeToDisk: true,
      }
    }
  },
}
