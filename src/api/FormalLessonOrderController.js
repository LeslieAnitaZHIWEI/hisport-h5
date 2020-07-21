import request from "@/utils/request";
import { host } from "./host";

export function getMyFormalLessonOrderPage(params) {
  return request({
    url: host + "/formallessonorder/getMyFormalLessonOrderPage",
    method: "get",
    params
  });
}

export function customerBooking(data) {
  return request({
    url: host + "/formallessonorder/customerBooking",
    method: "post",
    data
  });
}

export function pay(data) {
  return request({
    url: host + "/formallessonorder/pay",
    method: "post",
    data
  });
}

export function getCache(data) {
  return request({
    url: host + "/pay/getCache",
    method: "post",
    data
  });
}


/**
 * 获取教练某一天的排课
 * @param {Object} params
 * @param {string} params.coachId 教练用户id
 * @param {string} params.dateStr 日期 2020-07-07
 */
export function getAllBeginTimeOnOneDay(params) {
  return request({
    url: host + "/formallessonorder/getAllBeginTimeOnOneDay",
    method: "get",
    params
  });
}


/**
 * 判断是否可以预约正式课 0不可以 1可以
 */
export function getIsEligibility() {
  return request({
    url: host + "/formallessonorder/isEligibility",
    method: "get",
  });
}

/**
 * 订单详情
 */
export function getFormalLessonOrder(params) {
  return request({
    url: host + "/formallessonorder/"+ params.orderId,
    method: "get",
  });
}


/**
 * 订单信息页面中的专用查询详情接口
 * @param { Object } params
 * @param { string } params.id 订单ID
 */
export function getFormalLessonOrderById(params) {
  return request({
    url: host + "/formallessonorder/getFormalLessonOrderById",
    method: "get",
    params,
  });
}



export function getFormalOrderStatus(params) {
  return request({
    url: host + "/formalLessonOrderPay/h5/status",
    method: "get",
    params,
  });
}

