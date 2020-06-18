import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: false,
    oId: false,
    oToken: false,
    oAccount: false,
    currentNode: false,
    account: false,
    lang: 'en',
    needAuth: true,
    needOAuth: true,
    menuCollapsed: false,
    oMenuCollapsed: false,
    hideLayout: false,
    commonHeader: {'x-from': 'web', 'x-language': 'zh'},
    selectedMenuKey: {'selected': [], 'open': []},
    injectPlatform: {'huawei':'华为','zte':'中兴','Yesten':'易视腾'},
    oSelectedMenuKey: {'selected': [], 'open': []},
    partnerTypes: [{value: 1, label: '开通企业账号'}, {value: 2, label: '提供视频版权'}, {value: 3, label: '视频版权授权'},
      {value: 4, label: '产品购买咨询'}
    ],
    definitionList: [{"value": "1", "label": "320P"}, {"value": "2", "label": "480P"}, {"value": "21", "label": "720P"}, {"value": "31", "label": "1080P"}, {"value": "32", "label": "4K"}],
    characterTypes: [{value: '演员', label: '演员'}, {value: '导演', label: '导演'}, {value: '编剧', label: '编剧'},
      {value: '制片人', label: '制片人'}, {value: '配音', label: '配音'}],
    authTypes: [{value: 1, label: '授权函'}, {value: 2, label: '完整版权链'}]
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      if (data) {
        localStorage.setItem('token', data)
        state.commonHeader['x-auth'] = data
      } else {
        delete state.commonHeader['x-auth']
        localStorage.removeItem('token')
      }
    },
    setOId(state, data) {
      state.oId = data
    },
    setCurrentNode(state, data) {
      state.currentNode = data
      if(data && data.name){
        document.title = data.name+"-瓜子视频";
      }
    },
    setOToken(state, data) {
      state.oToken = data.token
      if (data.token) {
        localStorage.setItem('token-' + data.id, data.token)
        state.commonHeader['o-auth'] = data.token
      } else {
        delete state.commonHeader['o-auth']
        if (data.id) {
          localStorage.removeItem('token-' + data.id)
        }
      }
    },
    setAccount(state, data) {
      state.account = data
    },
    setOAccount(state, data) {
      state.oAccount = data
    },
    setNeedAuth(state, data) {
      state.needAuth = data
    },
    setNeedOAuth(state, data) {
      state.needOAuth = data
    },
    setSelectedMenu(state, data) {
      state.selectedMenuKey = data
    },
    setOSelectedMenu(state, data) {
      state.oSelectedMenuKey = data
    },
    setMenuCollapsed(state, data) {
      state.menuCollapsed = data
    },
    setOMenuCollapsed(state, data) {
      state.oMenuCollapsed = data
    },
    setHideLayout(state, data) {
      state.hideLayout = data
    },
    setLang(state, data) {
      state.lang = data
    }
  },
  actions: {
    AccountInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        if (!state.token && !localStorage.getItem('token')) {
          reject()
          return
        }
        axios.get('/api/account/0?expand=menu').then(function (response) {
          commit('setAccount', response)
          resolve()
        }).catch(function () {
          commit('setToken', false)
          commit('setAccount', false)
          reject()
        })
      })
    },
    OAccountInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        if (!state.oId) {
          reject()
          return
        }
        if (!state.oToken && !localStorage.getItem('token-' + state.oId)) {
          reject()
          return
        }
        axios.get('/api/operate/0?expand=menu').then(function (response) {
          commit('setOAccount', response)
          resolve()
        }).catch(function () {
          commit('setOToken', false)
          commit('setOAccount', {token: false, id: state.oId})
          reject()
        })
      })
    }
  }
})
export default store
