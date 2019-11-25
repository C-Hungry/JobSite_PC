import axios from '@/libs/api.request'

// 登录
export const login = (data) => {
  return axios.request({
    url: '/api/User/Login',
    data,
    method: 'post'
  })
}

// 修改密码
export const updateUserPassword = (data) => {
  return axios.request({
    url: '/api/User/UserUpdatePassword',
    data,
    method: 'post'
  })
}

// 获取用户列表
export const getUserList = (data) => {
  return axios.request({
    url: '/api/User/UserList',
    data,
    method: 'post'
  })
}

// 新增用户
export const addUser = (data) => {
  return axios.request({
    url: '/api/User/UserAdd',
    data,
    method: 'post'
  })
}

// 修改用户
export const updateUser = (data) => {
  return axios.request({
    url: '/api/User/UserUpdate',
    data,
    method: 'post'
  })
}

// 删除用户
export const deleteUser = (data) => {
  return axios.request({
    url: '/api/User/UserDelete',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
