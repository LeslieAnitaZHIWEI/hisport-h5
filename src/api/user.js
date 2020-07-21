import request from "@/utils/request";
import { host } from "./host";
export function login(data) {
  return request({
    url: "/auth/mobile/token/sms",
    method: "post",
    headers: {
      isToken: "true",
      TENANT_ID: "1",
      Authorization: "Basic cGFtaXI6cGFtaXI="
    },
    params: data
  });
} 

export function loginWx(data) {
  return request({
    url: "/auth/wxmp/token/openid",
    method: "post",
    headers: {
      isToken: "true",
      TENANT_ID: "1",
      Authorization: "Basic cGFtaXI6cGFtaXI="
    },
    params: data
  });
}



export function refreshToken(data) {
  return request({
    url: "/auth/oauth/token",
    method: "get",

    params: {
      grant_type: "refresh_token",
      refresh_token: data,
      client_id: "pamir",
      client_secret: "pamir"
    }
  });
}

export function getInfo(token) {
  return request({
    url: "/admin/user/info",
    method: "get"
  });
}

/** 用户信息是否完善 */
export function getIsInfoFinish(token) {
  return request({
    url: host + "/customer/isInfoFinish",
    method: "get"
  });
}

export function getRegister(params){
  return request({
    url:'/admin/mp/check',
    method:'get',
    params
  })
}

export function getOpenId(params){
  return request({
    url:'/admin/mp/info',
    method:'get',
    params
  })
}



export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post"
  });
}

export function getPhoneCode(params) {
  const { mobile } = params;
  return request({
    url: "/admin/mobile/" + mobile,
    method: "get"
  });
}

export function getRegPhoneCode(params) {
  const { mobile } = params;
  return request({
    url: "/admin/mobile/" + mobile,
    method: "post"
  });
}

export function getWxPhoneCode(params) {
  const { mobile } = params;
  return request({
    url: "/admin/mobile/binding/" + mobile,
    method: "post"
  });
}
