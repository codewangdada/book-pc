import Vue from 'vue'
import ElementUI from 'element-ui';
import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import directive from './directive' // directive
import Pagination from "@/components/Pagination";

import { resetForm } from "@/utils/common"

Vue.prototype.resetForm = resetForm

Vue.config.productionTip = false

Vue.component('Pagination', Pagination)

Vue.use(directive)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
