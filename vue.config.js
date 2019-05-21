const WorkerPlugin = require('worker-plugin')

module.exports = {
  devServer: {
      clientLogLevel: 'info'
  },
  chainWebpack: config => {
    config
      .plugin('workerPlugin')
        .use(WorkerPlugin)
    //   .plugin()
    //   .rule('worker-ts')
    //     .test(/\.worker\.ts$/)
    //     .use('babel')
    //       .loader('babel-loader')
    //       .end()
    //     .use('ts')
    //       .loader('ts-loader')
    //       .tap(options => {
    //         console.log('Yeaah')
    //         return options;
    //       })
    //       .end()
  }
};