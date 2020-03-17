import Vue from 'vue'
import App from './App.vue'
// 导入全局的样式
import './assets/css/style.css'
// 导入路由
import VueRouter from 'vue-router'
// 如果是模块化开发环境下
Vue.use(VueRouter)
Vue.config.productionTip = false
// 导入首页组件
import index from './components/index.vue'

// 写路由规则
const routes = [
  // 重定向到 首页 index
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
]

// 实例化路由对象
const router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  // 传入路由对象
  router
}).$mount('#app')
