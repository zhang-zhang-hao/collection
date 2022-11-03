import request from '@/utils/request'

// banner
export function getSnapshotList (data) {
  return request({
    url: '/snapshot/getList',
    method: 'post',
    data: data
  })
}

export function getLogList (data) {
  return request({
    url: '/snapshot/getLogList',
    method: 'post',
    data: data
  })
}

export function getResultList (data) {
  return request({
    url: '/snapshot/getResultList',
    method: 'post',
    data: data
  })
}

export function getWhiteList (data) {
  return request({
    url: '/snapshot/getWhiteList',
    method: 'post',
    data: data
  })
}
