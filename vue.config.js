const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/book/',
  devServer: {
    proxy: {
      "/api": {
        //设置调用接口域名和端口号别忘了加http
        target: "http://43.142.88.253:8001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
