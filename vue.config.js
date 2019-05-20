module.exports = {
  devServer: {
      clientLogLevel: 'info'
  },
  chainWebpack: config => {
    config
      .entry('worker')
        .add('src/worker/fsaw.worker.ts')
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