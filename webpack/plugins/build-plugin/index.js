/* eslint-disable @typescript-eslint/no-var-requires */
const pluginName = 'BuildPlugin'
const VueFileTransform = require('./VueFileTransform')

// const isDebug = false
module.exports = class BuildPlugin {
  constructor({ path }) {
    this.path = path
  }
  apply(compiler) {
    // console.log('BuildPlugin apply', compiler)
    // compiler.hooks.entry
    compiler.hooks.entryOption.tap(pluginName, () => {
      console.log(`${pluginName} entryOption`)

      this.build()
    })

    compiler.hooks.watchRun.tap(pluginName, () => {
      console.log(`${pluginName} watchRun`)
    })
  }

  build() {
    console.log('path', this.path)
    new VueFileTransform({
      path: this.path
    })
  }
}
