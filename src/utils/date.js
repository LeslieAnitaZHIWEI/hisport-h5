import moment from 'moment';

export const cnWeekList = ['日', '一', '二', '三', '四', '五', '六'];

export function getTimeList() {
  return [
    {
      label: '上午',
      list: [
        { time: '09:00', id: 0 },
        { time: '10:00', id: 1 },
        { time: '11:00', id: 2 },
        { time: '12:00', id: 3 }
      ]
    },
    {
      label: '下午',
      list: [
        { time: '13:00', id: 4 },
        { time: '14:00', id: 5 },
        { time: '15:00', id: 6 },
        { time: '16:00', id: 7 },
        { time: '17:00', id: 8 },
        { time: '18:00', id: 9 },
      ]
    },
    {
      label: '晚上',
      list: [
        { time: '19:00', id: 10 },
        { time: '20:00', id: 11 }
      ]
    }
  ];
}

export function getDayList() {
  const list = [];

  const mm = moment();

  for (let i = 0; i < 30; i++) {
    list.push({
      label: (mm.month() + 1) + '/' + mm.date(),
      year: mm.year(),
      month: mm.month(),
      date: mm.date(),
      week: cnWeekList[mm.day()]
    });
    mm.add(1, 'day');
  }

  return list;
}
