import request from '@/utils/request'

export function getOrderList (data) {
  return request({
    url: '/order/list',
    method: 'post',
    data: data
  })
}

export function getTransferList (data) {
  return request({
    url: '/transfer/list',
    method: 'post',
    data: data
  })
}
