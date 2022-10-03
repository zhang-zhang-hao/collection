import request from '@/utils/request'

export function getList (data) {
  return request({
    url: '/user/getList',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function getDetail (data) {
  return request({
    url: '/user/getInfo',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function updateDetail (data) {
  return request({
    url: '/user/update',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function getWalletChain (data) {
  return request({
    url: '/user/getWalletChain',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function add (data) {
  return request({
    url: '/user/add',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
