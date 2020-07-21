import request from '@/utils/request'
import { host } from './host'



export function getTrainingTaget(params) {
  console.log(params,'params')
  return request({
    url: host + '/fitnessGoal/getList',
    method: 'get',
    params
  })
}
export function currentUserInfo(){
  return request({
    url:host+'/customer/currentUserInfo',
    method:'get'
  })
}

/**
 *
 * @param sex           性别
 * @param height        身高
 * @param weight        体重
 * @param fitnessGoal   健身目标
 * @returns {AxiosPromise}
 */
export function completeInfo(params) {
  const {sex, height, weight, fitnessGoal}=params
  return request({
    url: host + '/customer/completeInfo',
    method: 'post',
    data: { sex, height, weight, fitnessGoal }
  })
}

export function appointment(beginTime) {
  return request({
    url: host + '/lessonorder/customerBooking',
    method: 'post',
    data: beginTime
  })
}

/**
 * 体验课直播间查询
 */
export function getliveroominfo(params){
  return request({
    url:host+'/liveroominfo/customer/'+params.orderId,
    method:'get'
  })
}

/**
 * 体验课直播间查询
 */
export function getFormalLiveRoomInfo(params){
  return request({
    url:host+'/liveroominfo/customer/formal/'+params.orderId,
    method:'get'
  })
}
