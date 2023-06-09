import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  // 配置插件
  plugins: [
    // 默认储存在localstorage
    createPersistedState({
      // 本地储存名
      key: "ceshivuex",
      // 指定模块
      paths: ["user"],
    }),
  ],
});

export default store;
