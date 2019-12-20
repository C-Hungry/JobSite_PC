import axios from '@/libs/api.request'

// 提现申请列表
export const getCashOutList = (data) => {
  return axios.request({
    url: '/api/User/CashOutList',
    data,
    method: 'post'
  })
}

// 确认打款
export const confirmCashOut = (data) => {
  return axios.request({
    url: '/api/User/CashOutConfirm',
    data,
    method: 'post'
  })
}
