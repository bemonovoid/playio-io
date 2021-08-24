module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 3000,
    public: '0.0.0.0:3000'
  },
  publicPath: "/playio",
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}