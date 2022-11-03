import request from '@/utils/request'

// banner
export function getBannerList (data) {
  return request({
    url: '/index/bannerList',
    method: 'post',
    data: data
  })
}

export function delBanner (data) {
  return request({
    url: '/index/delBanner',
    method: 'post',
    data: data
  })
}

export function addBanner (data) {
  return request({
    url: '/index/addBanner',
    method: 'post',
    data: data
  })
}


export function getNoticesList (data) {
  return request({
    url: '/index/noticesList',
    method: 'post',
    data: data
  })
}

export function addNotices (data) {
  return request({
    url: '/index/addNotices',
    method: 'post',
    data: data
  })
}

export function delNotices (data) {
  return request({
    url: '/index/delNotices',
    method: 'post',
    data: data
  })
}

