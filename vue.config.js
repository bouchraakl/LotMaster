const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8082,
  },
  publicPath: process.env.NODE_ENV === "production" ? "/LotMaster/" : "/", // for github pages
})
