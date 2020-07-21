import request from '@/utils/request'
import { host } from './host'

/**
 *
 * @param phone       手机号
 * @param code        验证码
 * @param nickName    昵称
 * @param headImage   头像
 * @returns {AxiosPromise}
 */
export function register(params) {
  const {phone, code, nickName, headImage} =params
  return request({
    url: host + '/sysuserinfo/registerCustomer',
    method: 'post',
    data: { phone, code, nickName, headImage }
  })
}

export function registerWX(params) {
  const {phone, code, nickName, headImage,openid} =params
  return request({
    url: host + '/sysuserinfo/wechatRegisterCustomer',
    method: 'post',
    data: { phone, code, nickName, headImage,openid }
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
