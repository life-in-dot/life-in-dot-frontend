const addOneDay = oneDay => {
  const dateMillisec = new Date(oneDay).valueOf();

  const nextDateMillisec = new Date(dateMillisec + 24 * 60 * 60 * 1000);
  const newYear = new Date(nextDateMillisec).getFullYear();
  const newMonth = new Date(nextDateMillisec).getMonth() + 1;
  const newDate = new Date(nextDateMillisec).getDate();

  const nextDay = `${newYear}-${newMonth}-${newDate}`;

  return nextDay;
};

const calDatesOfNormalYear = (targetYear, birthMonth = 1, birthDate = 1) => {
  const datesOfYear = [];

  const firstDayOfNextYear = `${targetYear + 1}-${1}-${1}`;
  let oneDay = `${targetYear}-${birthMonth}-${birthDate}`;

  do {
    datesOfYear.push({
      year: +oneDay.split("-")[0],
      month: +oneDay.split("-")[1],
      date: +oneDay.split("-")[2],
    });
    oneDay = addOneDay(oneDay);
  } while (firstDayOfNextYear !== oneDay);

  return datesOfYear;
};

const calDatesOfLastYear = (targetYear, birthMonth, birthDate) => {
  const datesOfYear = [];

  const lastBirthday = `${targetYear}-${birthMonth}-${birthDate}`;
  let oneDay = `${targetYear}-${1}-${1}`;

  do {
    datesOfYear.push({
      year: +oneDay.split("-")[0],
      month: +oneDay.split("-")[1],
      date: +oneDay.split("-")[2],
    });
    oneDay = addOneDay(oneDay);
  } while (lastBirthday !== oneDay);

  return datesOfYear;
};

export default function calDatesOfYear(userBirthday, targetYear) {
  if (typeof targetYear !== "number") {
    return null;
  }

  const { year, month, date } = userBirthday;

  if (year === targetYear) {
    return calDatesOfNormalYear(targetYear, month, date);
  }

  if (year + 100 === targetYear) {
    return calDatesOfLastYear(targetYear, month, date);
  }

  return calDatesOfNormalYear(targetYear);
}
