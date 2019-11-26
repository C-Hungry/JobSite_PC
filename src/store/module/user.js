import { login } from '@/api/user'
import { setToken, getToken, setUserName, getUserName } from '@/libs/util'

export default {
  state: {
    userName: getUserName(),
    userId: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
      setUserName(name)
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(data => {
          commit('setToken', data.token)
          commit('setUserName', data.UserName)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    }
  }
}
