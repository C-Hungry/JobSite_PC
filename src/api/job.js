import axios from '@/libs/api.request'

// 获取岗位列表
export const getJobList = (data) => {
  return axios.request({
    url: '/api/Job/JobList',
    data,
    method: 'post'
  })
}

// 新增岗位
export const addJob = (data) => {
  return axios.request({
    url: '/api/Job/JobAdd',
    data,
    method: 'post'
  })
}

// 修改岗位
export const updateJob = (data) => {
  return axios.request({
    url: '/api/Job/JobUpdate',
    data,
    method: 'post'
  })
}

// 删除岗位
export const deleteJob = (data) => {
  return axios.request({
    url: '/api/Job/JobDelete',
    data,
    method: 'post'
  })
}

// 推荐/取消推荐岗位
export const recommendJob = (data) => {
  return axios.request({
    url: '/api/Job/JobRecommend',
    data,
    method: 'post'
  })
}

// 启用/禁用岗位
export const forbidJob = (data) => {
  return axios.request({
    url: '/api/Job/JobEnabled',
    data,
    method: 'post'
  })
}

// 查看岗位详情
export const getJobInfo = (data) => {
  return axios.request({
    url: '/api/Job/JobInfo',
    data,
    method: 'post'
  })
}

// 获取岗位关键词列表
export const getJobKeyWordsList = (data) => {
  return axios.request({
    url: '/api/Job/JobKeyWordsList',
    data,
    method: 'post'
  })
}

// 新增岗位关键词
export const addJobKeyWords = (data) => {
  return axios.request({
    url: '/api/Job/JobKeyWordsAdd',
    data,
    method: 'post'
  })
}

// 删除岗位关键词
export const deleteJobKeyWords = (data) => {
  return axios.request({
    url: '/api/Job/JobKeyWordsDelete',
    data,
    method: 'post'
  })
}
