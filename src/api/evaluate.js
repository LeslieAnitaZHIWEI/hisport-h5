import request from '@/utils/request'
import { host } from './host'


export function addComment(data) {
  return request({
    url: host + '/lessonorder/comment',
    method: 'post',
    data: data
  })
}

export function addFormalComment(data) {
  return request({
    url: host + '/formallessonorder/comment',
    method: 'post',
    data: data
  })
}
