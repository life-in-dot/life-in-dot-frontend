export default function calDatesData(
  datesOfTargetYear,
  targetYear,
  userBirthDay,
) {
  const oneYearData = [];
  let curMonth = 1;
  let col = 1;
  let row = 1;

  const { year, month, date } = userBirthDay;
  const birthYear = year;
  const birthMonth = month;
  const birthDate = date;

  if (targetYear === birthYear) {
    col = birthMonth - 1;
  }

  datesOfTargetYear.forEach(targetDate => {
    const { year, month, date } = targetDate;
    const dateId = `${year}-${month}-${date}`;

    if (curMonth < month) {
      col++;
      row = 1;
      curMonth = month;
    }

    if (year === birthYear && month === birthMonth && row < birthDate) {
      row += birthDate - 1;
    }

    oneYearData.push({
      dateId,
      year,
      month,
      date,
      r: 0.1,
      x: row,
      y: col,
    });

    row++;
  });

  return oneYearData;
}
