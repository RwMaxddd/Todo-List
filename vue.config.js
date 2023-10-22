const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  configureWebpack: {
    //
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve("./node_modules/vue"),
      },
    },
  },
  transpileDependencies: true
})
