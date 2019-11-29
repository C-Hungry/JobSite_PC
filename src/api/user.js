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

// 重置密码
export const resetUserPassword = (data) => {
  return axios.request({
    url: '/api/User/ResetPasswordByAdmin',
    data,
    method: 'post'
  })
}
