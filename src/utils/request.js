// axios相关设置
import Vue from 'vue'
// 引入axios
import axios from 'axios'
// 引入路由
import router from '../router'
// 引入toast
import { Toast } from 'vant'

// 设置axios的全局基本设置
Vue.prototype.$axios = axios
// 基地址设置
const URL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
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
