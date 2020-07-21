import request from '@/utils/request';
import { host } from './host';

/**
 * 推荐教练
 */
export function getRecommendCoach(params) {
  return request({
    url: host + "/coach/getRecommendCoach",
    method: "get",
    params,
  });
}

/**
 * 个人履历
 * @param {Object} params
 * @param {string} params.coachId 教练用户id
 */
export function getCoachInfo(params) {
  return request({
    url: host + "/coach/getCoachInfo",
    method: "get",
    params
  });
}

/**
 * 学员评价分页
 * @param {Object} params
 * @param {string} params.coachId 教练用户id
 * @param {string} params.current 页数
 * @param {string} params.size 页数
 */
export function getCommentPage(params) {
  return request({
    url: host + "/coach/getCommentPage",
    method: "get",
    params
  });
}

/**
 * 最近动态
 * @param {Object} params
 * @param {string} params.coachId 教练用户id
 */
export function getCoachRecentDynamic(params) {
  return request({
    url: host + "/coachdynamic/h5/recentDynamic",
    method: "get",
    params
  });
}


/**
 * 查看近期预约
 * @param {Object} params
 * @param {string} params.coachId 教练用户id
 * @param {number} params.current 当前页
 * @param {number} params.size 一页多少条
 */
export function getAppointments(params) {
  return request({
    url: host + "/coach/getBefore",
    method: "get",
    params
  });
}
