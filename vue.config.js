module.exports = {
  publicPath: "/account/",
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    sourceMap: false,
  },
  devServer: {
    proxy: "https://api.com/api"
  }
};
