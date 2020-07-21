import request from '@/utils/request'
import { host } from './host'



export function getInfo(params) {
  return request({
    url: host + '/qanda/h5/getInfo',
    method: 'get',
    params
  })
}

export function addQanda(data) {
  return request({
    url: host + '/qanda/h5',
    method: 'post',
    data
  })
}


export function getList(params) {
    return request({
      url: host + '/qanda/h5/list',
      method: 'get',
      params
    })
  }


  
export function listByOrderId(params) {
    return request({
      url: host + '/qanda/h5/listByOrderId',
      method: 'get',
      params
    })
  }

  export function feedback(params) {
    return request({
      url: host + '/feedback',
      method: 'post',
      params
    })
  }
  
  
