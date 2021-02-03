/* eslint-disable @typescript-eslint/no-var-requires */
const nodePathUitl = require('path')
const fs = require('fs')
const babel = require('@babel/core')
const babelParser = require('@babel/parser')

const { parse } = require('@vue/component-compiler-utils')
const compiler = require('vue-template-compiler')

class VueFileTransform {
  constructor({ path }) {
    this.debug = true
    // this.log('path = ', path)

    this.path = path
    this.path2Ast(path)
  }

  log(...a) {
    if (this.debug) {
      console.log(...a)
    }
  }

  path2Ast(path) {
    this.log('path', path)
    // 获取文件内容
    const source = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' })
    this.source = source

    // this.log('source', source)

    // 使用 @vue/component-compiler-utils 读 .vue 格式的文件
    const filename = nodePathUitl.basename(path)
    const sourceRoot = nodePathUitl.dirname(path).split('/src')[0]

    this.log('sourceRoot', sourceRoot)

    this.filename = filename
    this.rootPath = sourceRoot
    const descriptor = parse({
      source,
      compiler,
      filename,
      sourceRoot
    })

    this.log('descriptor', descriptor)

    // 把 template 部分 使用 @vue/babel-preset-jsx 解析成 ast
    this.templateAst = this.content2Ast(descriptor?.template?.content, {
      presets: ['@vue/babel-preset-jsx']
    })
    this.scriptAst = this.content2Ast(descriptor?.script?.content, {
      presets: [
        [
          '@babel/preset-typescript',
          {
            allExtensions: true
          }
        ]
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ]
    })

    // this.log('templateAst: ', templateAst)
    // this.log('scriptAst: ', scriptAst)
  }

  content2Ast(content, morePorps) {
    this.log('content2Ast content:', content)
    const porps = {
      filename: this.filename,
      root: this.rootPath,
      ...morePorps
    }
    const transForm = babel.transformSync(content, porps) // 这里报错
    // this.log('content2Ast transForm:', transForm)

    const { code } = transForm
    this.log('content2Ast code:', code)

    return babelParser.parse(code, {
      sourceType: 'module'
    })
  }
}

module.exports = VueFileTransform
