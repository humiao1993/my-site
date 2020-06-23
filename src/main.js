// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins'

store.commit('setToken', localStorage.getItem('token'))
router.beforeEach((to, from, next) => {
  let dispatchAccountInfo = false
  store.commit('setNeedAuth', to.meta.auth ? true : false)
  if (localStorage.getItem('token') && !store.state.account) {
    dispatchAccountInfo = store.dispatch('AccountInfo')
  }
  if (to.meta.auth && !store.state.account) {
    if (!localStorage.getItem('token')) {
      next('/')
      return
    }
    if (!dispatchAccountInfo) {
      dispatchAccountInfo = store.dispatch('AccountInfo')
    }
    dispatchAccountInfo.then(()=> {
      next()
    })
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#my-site',
  router,
  store,
  render: h => h(App)
})
