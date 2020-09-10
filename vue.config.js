module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: {
    // 排除依赖项(排除的模块名：全局变量名)
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios',
      lodash: '_'
    }
  }
}
