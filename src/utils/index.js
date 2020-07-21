import { Toast } from 'vant';

/**
 * Created by PanJiaChen on 16/11/18.
 */
import moment from 'moment'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function getBMI(weight, height) {
  return weight / Math.pow(height / 100, 2)
}


export function getWeek(time){
const weekList=['周日','周一','周二','周三','周四','周五','周六']
return weekList[moment(time).day()]
}

/**
 * 判断是否PC端
 */
export function checkIsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  if(window.screen.width>=768){
       flag = true;
  }
  return flag;
}

/** @type {boolean}
 *  是否是PC环境
 */
export const isPC = checkIsPC();

/**
 * 判断是否是微信浏览器
 */
export function checkIsWeiXin(){
   var ua = window.navigator.userAgent.toLowerCase();

  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }

  return false;
};

/** @type {boolean}
 * 是否是微信浏览器
 */
export const isWeiXin = checkIsWeiXin();

/**
 * 从地址栏中获得某一字段值
 * @param {string} name 字段名
 * @returns {string | null}
 */
export function getQueryString(name) {
  const arr = location.search.substr(1).split('&');
  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i].split('=');
    if (item.shift() === name) {
      return decodeURIComponent(item.join('='));
    }
  }
  return '';
};

export function apiCatchHandler(e){

  const {response} = e;

  if(response){
    const { data } = response;
    if(data){
      Toast(data.msg || data.message || '未知错误');
    }else if(response.message){
      Toast(response.message);
    }
  }else{

    const msg = (e.msg || e.message);
    if(msg){
      Toast(msg);
    }else{
      const { data } = e;
      const { msg, message} = data;

      Toast(msg || message || '未知错误');
    }
  }

}
