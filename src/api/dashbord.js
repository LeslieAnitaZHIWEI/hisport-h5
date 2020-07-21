import request from '@/utils/request'
import { host } from './host'


export function getMyLessonOrderPage(data) {
  return request({
    url: host + '/lessonorder/getMyLessonOrderPage',
    method: 'get',
    params: data
  })
}
export function getPlan(data) {
    return request({
      url: host + '/lessonorder/getPlan',
      method: 'get',
      params: data
    })
  }

  export function isEligibilityExp(data) {
    return request({
      url: host + '/lessonorder/isEligibility',
      method: 'get',
      params: data
    })
  }
  
  
