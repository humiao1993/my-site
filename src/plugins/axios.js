import Vue from "vue";
import VueAxios from "vue-axios";
import axios from 'axios'
import store from "../store";

axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.common['x-from'] = 'web'
const language = navigator ? (navigator.userLanguage ? navigator.userLanguage : navigator.language) : store.state.token
axios.defaults.headers.common['x-language'] = language.split('-')[0]
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common['x-auth'] = store.state.token
    } else if (localStorage && localStorage.getItem('token')) {
      config.headers.common['x-auth'] = localStorage.getItem('token')
    }
    if (store.state.oToken) {
      config.headers.common['o-auth'] = store.state.oToken
    } else if (store.state.oId && localStorage && localStorage.getItem('token-' + store.state.oId)) {
      config.headers.common['o-auth'] = localStorage.getItem('token-' + store.state.oId)
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error && error.response && error.response.status) {
    switch (error.response.status) {
      case 401:
        if (error.response.data.code < 0) {
          store.commit('setOToken', {token: false, id: store.state.oId})
          store.commit('setOAccount', false)
          if (store.state.needOAuth) {
            window.location.href = '/m/operation/' + store.state.oId + '/login'
          }
        } else {
          store.commit('setToken', false)
          store.commit('setAccount', false)
          if (store.state.needAuth) {
            window.location.href = '/account/login'
          }
        }
        break
      // case 404:
      //   window.location.href = '/static/404'
      //   break
      default:
        return Promise.reject(error.response.data)
    }
  } else {
    return Promise.reject(error.response.data)
  }
})

Vue.use(VueAxios, axios);
