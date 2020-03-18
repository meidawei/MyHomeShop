import Vue from 'vue'
import App from './App.vue'
// 导入全局的样式
import './assets/css/style.css'
// 导入路由
import VueRouter from 'vue-router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入iview
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// 引入时间格式
import moment from "moment";
// Vuex的使用
import Vuex from 'vuex'

// 如果是模块化开发环境下
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.use(Vuex)
Vue.config.productionTip = false
// 导入首页组件
import index from './components/index.vue'
// 商品详情页组件
import detail from './components/detail.vue'
// 购物车详情页组件
import shopcar from './components/shopcar.vue'
// 引入全局的axios
import axios from 'axios'
// 可以使用axios来设置基地址
// axios.defaults.baseURL = 'http://134.175.59.248:8899/';
// 使用$作为前缀 用于区分普通的属性
Vue.prototype.$axios  = axios
Vue.prototype.$baseUrl = 'http://134.175.59.248:8899/'
// 挂载到原型上
// 写路由规则
const routes = [
  // 重定向到 首页 index
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/detail/:id', component: detail },
  { path: '/shopcar', component: shopcar }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})
const store = new Vuex.Store({
  state: {
    carData:JSON.parse(window.localStorage.getItem('carData')) || {90:6,84:7}
  },
  getters: {
    carNum(state){
      let num = 0
      for(const key in state.carData){
        num += state.carData[key]
      }
      return num
    }
  },
  // 提交载荷
  mutations: {
    increment (state,obj) {
      // 判断是否里面已经有数据
      if(state.carData[obj.goodId]){
        //vuex已经存在该商品id
        state.carData[obj.goodId] += obj.goodNum
      }else{
        // 使用Vue.set 更新数据成 动态增加的属性 vuex 没有同步更新
        Vue.set(state.carData,obj.goodId,obj.goodNum)
      }
    }
  }
})

// 全局过滤器
// 过滤日期
Vue.filter('shortTime',value=>{
  return moment(value).format("YYYY-MM-DD");
}),
Vue.filter('imgUrl',value=>{
  return value.replace(
    "http://111.230.232.110:8899",
    "http://134.175.59.248:8899"
  );
}),
// 过滤日期
Vue.filter('currentTime',value=>{
  return moment(value).format("YYYY-MM-DD hh:mm:ss");
}),
// 浏览器关闭时保存数据
window.onbeforeunload = ()=>{
  window.localStorage.setItem('carData',JSON.stringify(store.state.carData))
}
new Vue({
  render: h => h(App),
  // 传入路由对象
  router,
  // Vuex对象
  store
}).$mount('#app')
