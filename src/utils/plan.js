const planLevelList = [
  {
    title: '第一阶段',
    description: '1个月（12-18次）',
  },
  {
    title: '第二阶段',
    description: '3个月（36次）',
  },
  {
    title: '第三阶段',
    description: '3个月（36次）',
  },
];

export function getPlanLevelByDay(dayNum = 0){

  if(dayNum > 120){
    return planLevelList[2];
  }

  if(dayNum > 30){
    return planLevelList[1];
  }

  return planLevelList[0];

}
