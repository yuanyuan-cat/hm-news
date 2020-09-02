import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'

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
  { path: '/comment', component: MyComment, name: 'mt-comment' }
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
