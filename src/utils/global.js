// 放全局组件
import Vue from 'vue'
// 引入全局header组件
import HmHeader from '../components/HmHeader.vue'
// 引入全局logo组件
import HmLogo from '../components/HmLogo.vue'
// 引入导航条组件
import HmNavItem from '../components/HmNavItem.vue'
// 引入顶部条组件
import HmTopNav from '../components/HmTopBar.vue'
// 引入文章列表组件
import HmPost from '../components/HmPost.vue'
// 引入文章评论列表组件
import HmComment from '../components/HmComment.vue'
// 引入文章评论楼层组件
import HmFloor from '../components/HmFloor.vue'

Vue.component('hm-header', HmHeader)

Vue.component('hm-logo', HmLogo)

Vue.component('hm-navitem', HmNavItem)

Vue.component('hm-topbar', HmTopNav)

Vue.component('hm-post', HmPost)

Vue.component('hm-comment', HmComment)

Vue.component('hm-floor', HmFloor)
