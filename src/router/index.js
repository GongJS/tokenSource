import Vue from 'vue'
import Router from 'vue-router'
import TokenDapp from '@/components/token-dapp'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'token-dapp',
    component: TokenDapp
  }]
})