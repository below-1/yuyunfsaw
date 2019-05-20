module.exports = {
  mode: 'development',
  context: '/home/you/Project13/yuyun-fsaw2',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/home/you/Project13/yuyun-fsaw2/public/worker',
    filename: '[name].js',
    publicPath: '/',
    globalObject: 'this'
  },
  resolve: {
    alias: {
      '@': '/home/you/Project13/yuyun-fsaw2/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.ts'
    ],
    modules: [
      'node_modules',
      '/home/you/Project13/yuyun-fsaw2/node_modules',
      '/home/you/Project13/yuyun-fsaw2/node_modules/@vue/cli-service/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      '/home/you/Project13/yuyun-fsaw2/node_modules/@vue/cli-plugin-typescript/node_modules',
      '/home/you/Project13/yuyun-fsaw2/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/home/you/Project13/yuyun-fsaw2/node_modules',
      '/home/you/Project13/yuyun-fsaw2/node_modules/@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: '/home/you/Project13/yuyun-fsaw2/node_modules/.cache/ts-loader',
              cacheIdentifier: '22ce40f8'
            }
          },
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: 'babel-loader'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      }
    ]
  },
  entry: {
    fsaw: 'src/worker/fsaw.worker.ts',
    repo: 'src/worker/repo.worker.ts',
    settings: 'src/worker/settings.worker.ts'
  }
}
