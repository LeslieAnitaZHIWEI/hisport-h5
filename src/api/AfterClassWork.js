import request from '@/utils/request'
import { host } from './host'



export function getWork(data) {
  return request({
    url: host + '/afterclasswork/getWork',
    method: 'get',
    params: data
  })
}

export function getAfterClassWorkByOrderId(data) {
  return request({
    url: host + '/afterclasswork/h5/getAfterClassWorkByOrderId',
    method: 'get',
    params: data
  })
}

export function getFormalAfterClassWorkByOrderId(data) {

  return request({
    url: host + '/formalafterclasswork/h5/getAfterClassWorkByOrderId',
    method: 'get',
    params: data
  })
}

export function getHistory() {
  return request({
    url: host + '/afterclasswork/getHistory',
    method: 'get',
  })
}

export function getAfterClassWorkInfo(data) {
  return request({
    url: host + '/afterclasswork/h5/getAfterClassWorkInfo',
    method: 'get',
    params: data
  })
}

export function getFormalAfterClassWorkInfo(data) {
  return request({
    url: host + '/formalafterclasswork/h5/getAfterClassWorkInfo',
    method: 'get',
    params: data
  })
}
