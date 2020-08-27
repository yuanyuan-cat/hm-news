import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入全局vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入rem适配配置
import 'amfe-flexible'
// 引入全局header组件
import HmHeader from './components/HmHeader.vue'
// 引入全局logo组件
import HmLogo from './components/HmLogo.vue'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.component('hm-header', HmHeader)

Vue.component('hm-logo', HmLogo)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
