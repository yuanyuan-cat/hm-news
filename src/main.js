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
// 引入注册全局头部组件
import HmHeader from './components/HmHeader.vue'
Vue.component('hm-header', HmHeader)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
