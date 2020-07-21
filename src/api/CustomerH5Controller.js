import request from '@/utils/request'
import { host } from './host'


export function editInfo(data) {
  return request({
    url: host + '/customer/editInfo',
    method: 'post',
    data
  })
}

export function currentUserInfo(params) {
    return request({
      url: host+'/customer/currentUserInfo',
      method: 'get',
      params
    })
  }
  export function upload(formData) {
    return request({
      url: host + '/customer/upload',
      method: 'post',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
  
    })
  }
  