export default function calYearsData(birthYear) {
  const hundredYearsData = [];

  let year = birthYear;
  let col = 1;
  let row = 1;

  do {
    hundredYearsData.push({
      year,
      r: 0.1,
      x: col,
      y: row,
    });

    col++;
    year++;

    if (col === 11) {
      col = 1;
      row++;
    }
  } while (row < 11);

  return hundredYearsData;
}
