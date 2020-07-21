import request from '@/utils/request'
import {host} from './host'
export function getByUserId(data) {
  return request({
    url: host+'/customer/getByUserId',
    method: 'get',
    params:data
  })
}
export function getlessonorderByOrderId(data) {
  return request({
    url: host+'/lessonorder/'+data.id,
    method: 'get',
  })
}

export function getFormalLessonOrderByOrderId(data) {
  return request({
    url: host+'/formallessonorder/'+data.id,
    method: 'get',
  })
}

export function editGoalAndPreferences(data) {
  return request({
    url: host+'/customer/editGoalAndPreferences',
    method: 'put',
    data
  })
}
