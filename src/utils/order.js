import { getIsEligibility } from '@/api/FormalLessonOrderController';

export function checkIsEligibility(){

  /** 判断是否可以预约正式课 0不可以 1可以 */
  return getIsEligibility().then((res) => {
    const {code ,data } = res;

    if(code === 0){
      return data === 1;
    }

    return false;
  });

}

export function getPayMethod(methodId){
  console.log(methodId);
  return {
    '0': {
      label: '微信'
    },
    '1': {
      label: '支付宝'
    }
  }[`${methodId}`] || null;
}
