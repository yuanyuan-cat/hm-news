import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入全局vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 引入rem适配配置
import 'amfe-flexible'
// 引入全局header组件
import HmHeader from './components/HmHeader.vue'
// 引入全局logo组件
import HmLogo from './components/HmLogo.vue'
// 引入导航条组件
import HmNavItem from './components/HmNavItem.vue'
// 引入axios
import axios from 'axios'
// 引入moment
import moment from 'moment'
// 设置全局的time过滤器
Vue.filter('time', input => moment(input).format('YYYY-MM-DD'))
// 设置axios的全局基本设置
Vue.prototype.$axios = axios
// 基地址设置
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 请求拦截器设置
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器设置
axios.interceptors.response.use(response => {
  const { message, statusCode } = response.data
  // 判断token验证是否正确
  if (message === '用户信息验证失败' && statusCode === 401) {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast.fail('登录信息失效')
  }
  return response
})

Vue.component('hm-header', HmHeader)

Vue.component('hm-logo', HmLogo)

Vue.component('hm-navitem', HmNavItem)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
