import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// // 按需导入导入组件库
// import {JTest} from './../packages'
// // 注册组件库
// Vue.use(JTest)

// 去哪聚导入
import JAni from './../packages'
Vue.use(JAni)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
