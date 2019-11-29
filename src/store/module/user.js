import { login } from '@/api/user'
import { setToken, getToken, setAccess, getAccess, setUserName, getUserName } from '@/libs/util'

export default {
  state: {
    userName: getUserName(),
    userId: '',
    token: getToken(),
    access: getAccess()
  },
  getters: {
    isAdmin: state => {
      return state.access == 'admin'
    }
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
    },
    setAccess (state, access) {
      state.access = access
      setAccess(access)
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
          commit('setAccess', data.IsAdmin ? 'admin' : '')
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
        resolve()
      })
    }
  }
}
