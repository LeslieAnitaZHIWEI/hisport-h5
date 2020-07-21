import request from '@/utils/request'
import { host } from './host'

const pre = host + '/trainingplanbook'

export function getInfo(data) {
  return request({
    url: pre + '/h5/getInfo',
    method: 'get',
    params: data
  })
}
