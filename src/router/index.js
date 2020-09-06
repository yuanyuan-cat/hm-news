import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件（user）
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
// 导入组件（news）
import Index from '../views/news/Index.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/follow', component: MyFollow, name: 'my-follow' },
  { path: '/comment', component: MyComment, name: 'mt-comment' },
  { path: '/star', component: MyStar, name: 'my-star' },
  { path: '/', component: Index, name: 'index' }
]

const router = new VueRouter({
  routes
})
// 设置全局的导航护卫
const token = localStorage.getItem('token')
const authorPath = ['/user', '/user-edit', '/follow', '/comment']
router.beforeEach((to, from, next) => {
  if (!authorPath.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
