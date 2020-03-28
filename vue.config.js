module.exports = {
  //关闭Eslint
  lintOnSave: false,
  //路径别名
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}