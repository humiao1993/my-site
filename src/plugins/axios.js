import Vue from "vue"
import VueAxios from "vue-axios"
import axios from 'axios'
import store from '../store'

//请求拦截器，在每个请求之前给header加上token参数
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.token = store.state.token
    }
    else if (localStorage && localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
//响应拦截器,如果响应状态码为401就清除token并返回登陆页面
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          store.commit('setToken', false)
          store.commit('setAccount', false)
          if (store.state.needAuth) {
            window.location.href = '/'
          }
          break
        default:
          return Promise.reject(error.response.data)
      }
    } else {
      return Promise.reject(error.response.data)
    }
  })
Vue.use(VueAxios, axios)
