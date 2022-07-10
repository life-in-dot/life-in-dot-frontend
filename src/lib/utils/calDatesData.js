export default function calDatesData(datesOfTargetYear) {
  const oneYearData = [];
  let curMonth = 1;
  let col = 1;
  let row = 1;

  datesOfTargetYear.forEach(targetDate => {
    const { year, month, date } = targetDate;

    if (curMonth < month) {
      col++;
      row = 1;
      curMonth = month;
    }

    oneYearData.push({ year, month, date, r: 0.1, x: row, y: col });

    row++;
  });

  return oneYearData;
}
