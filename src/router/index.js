import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件（user）
const Login = () => import(/* webpackChunkName: "user" */ '../views/user/Login.vue')
const Register = () => import(/* webpackChunkName: "user" */ '../views/user/Register.vue')
const User = () => import(/* webpackChunkName: "user" */ '../views/user/User.vue')
const UserEdit = () => import(/* webpackChunkName: "user" */ '../views/user/UserEdit.vue')
const MyFollow = () => import(/* webpackChunkName: "user" */ '../views/user/MyFollow.vue')
const MyComment = () => import(/* webpackChunkName: "user" */ '../views/user/MyComment.vue')
const MyStar = () => import(/* webpackChunkName: "user" */ '../views/user/MyStar.vue')
// 导入组件（news）
const Index = () => import(/* webpackChunkName: "index" */ '../views/news/Index.vue')
const Manage = () => import(/* webpackChunkName: "news" */ '../views/news/Manage.vue')
const PostDetail = () => import(/* webpackChunkName: "news" */ '../views/news/PostDetail.vue')
const Search = () => import(/* webpackChunkName: "news" */ '../views/news/Search.vue')

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
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
  { path: '/search', component: Search, name: 'search' }
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
