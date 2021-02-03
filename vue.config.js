/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path')
const BuildPlugin = require('./webpack/plugins/build-plugin')

const getPath = path => {
  return resolve(__dirname, path)
}
module.exports = {
  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      new BuildPlugin({
        path: getPath('./src/components/HelloWorld.vue')
      })
    ]
  },
  parallel: true
}
