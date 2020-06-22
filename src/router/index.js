import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const WELCOME = () => import('@/pages/Welcome')
const HOME = () => import('@/pages/Home')

let path = [
  {
    path: '/',
    name: WELCOME.name,
    component: WELCOME,
  },
  {
    path: '/home',
    name: HOME.name,
    component: HOME
  }
]

let router = new Router({
  mode: 'history',
  routes: [
    ...path
  ]
})

export default router
