import axios from '@/libs/api.request'

// 咨询列表
export const getQuestionList = (data) => {
  return axios.request({
    url: '/api/User/QuestionList',
    data,
    method: 'post'
  })
}

// 回复咨询
export const replyQuestion = (data) => {
  return axios.request({
    url: '/api/User/QuestionReply',
    data,
    method: 'post'
  })
}

// 关闭咨询
export const closeQuestion = (data) => {
  return axios.request({
    url: '/api/User/QuestionClose',
    data,
    method: 'post'
  })
}
