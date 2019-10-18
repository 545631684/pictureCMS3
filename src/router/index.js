import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由跳转页面顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 前后台路由分开调用
import web from './modules/web'
import admin from './modules/admin'

Vue.use(VueRouter)

// 用es6展开语法赋值
const routes = [
  ...admin,
  ...web
]

// 创建路由，并设置url为'history'模式需要后台支持（相关内容查看官网介绍），以及模仿浏览器跳转效果以及每次跳转页面后置顶设置
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 页面跳转置顶进度条开始
  NProgress.start()
  next() // 确保一定要调用 next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 页面跳转置顶进度条结束
  NProgress.done()
})
export default router