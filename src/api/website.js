import axios from '@/libs/api.request'

// h5首页设置
export const h5HomeSet = (data) => {
  return axios.request({
    url: '/api/H5/H5SetUpAddOrUpdate',
    data,
    method: 'post'
  })
}

// 查看h5首页设置
export const getH5HomeInfo = (data) => {
  return axios.request({
    url: '/api/H5/H5SetUpInfo',
    data,
    method: 'post'
  })
}
