import request from '@/utils/request'

export function getList (data) {
  return request({
    url: '/goods/getList',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function add (data) {
  return request({
    url: '/goods/add',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function createDetail (data) {
  return request({
    url: '/goods/createDetail',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

export function getDetailedList (data) {
  return request({
    url: '/goods/getDetailedList',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

