import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
//去除移动端300毫秒延时问题
import fastClick from 'fastclick'
//去除默认CSS样式
import './assets/styles/reset.css'
//解决移动端1px边框问题
import './assets/styles/border.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
