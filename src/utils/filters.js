// 过滤器设置
import Vue from 'vue'
// 引入moment
import moment from 'moment'
// 设置全局的语言环境
moment.locale('zh-CN')
// 设置全局的time过滤器
Vue.filter('time', (input, str = 'YYYY-MM-DD') => moment(input).format(str))
Vue.filter('now', input => moment(input).fromNow())
