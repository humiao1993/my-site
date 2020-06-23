import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: false,
    account: false,
    needAuth: true,
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      if (data) {
        localStorage.setItem('token', data)
        state.token = data
      } else {
        delete state.token
        localStorage.removeItem('token')
      }
    },
    setAccount(state, data) {
      state.account = data
    },
    setNeedAuth(state, data) {
      state.needAuth = data
    },
  },
  actions: {
    AccountInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        if (!state.token && !localStorage.getItem('token')) {
          reject()
          return
        }
        axios.get('/api/account/0').then(function (response) {
          commit('setAccount', response)
          resolve()
        }).catch(function () {
          commit('setToken', false)
          commit('setAccount', false)
          reject()
        })
      })
    },
  }
})
export default store
