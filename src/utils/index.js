const getNowTime = () => {
  const now = new Date();
  return now.toLocaleDateString();
};

const getWeekStartAndEndDates = function (date) {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay();
  const weekStartDate = new Date(currentDate);
  weekStartDate.setDate(currentDate.getDate() - dayOfWeek);
  weekStartDate.setHours(0, 0, 0, 0);

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);
  weekEndDate.setHours(23, 59, 59, 999);
 
  return {
    start: weekStartDate.toLocaleDateString(),
      end: weekEndDate.toLocaleDateString(),
    //   .toLocaleDateString()
  };
};

const getNowWeek = function () {
  const today =  new Date();
  const firstDay = new Date(today.getFullYear(), 0, 1);
  const gap = Math.round((today.valueOf() - firstDay.valueOf() )/ 86400000);
  return Math.ceil((gap + ((firstDay.getDay() + 1) - 1)) / 7);
};
const addZero = (str) => {
    if (str < 10) {
        return `0${str}`
    } else {
        return str    
    }
    
}
const getYearWeeks = function () {
    const weeks = [];
    const nowYear = new Date().getFullYear();
  const startDate = new Date(nowYear, 0, 1); // 第一天是一年中的第一天

  while (startDate.getFullYear() === nowYear) {
      const { start, end } = getWeekStartAndEndDates(startDate);
    //   const newStart = `${addZero(start.getMonth()+1) }${addZero(start.getDate())}`
    //   const newEnd = `${addZero(end.getMonth()+1) }${addZero(end.getDate())}`
    weeks.push({ start, end });
    startDate.setDate(startDate.getDate() + 7); // 移至下一周的開始日期
  }
  return weeks;
};


export { getNowTime, getWeekStartAndEndDates, getNowWeek, getYearWeeks ,addZero};
