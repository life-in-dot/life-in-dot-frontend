export default function calculateYears(birthYear) {
  const hundredYears = [];

  let year = birthYear;
  let col = 1;
  let row = 1;

  do {
    hundredYears.push({
      year,
      r: 0.1,
      x: col,
      y: row,
    });

    col++;
    year++;

    if (col === 11) {
      row++;
      col = 1;
    }
  } while (row < 11);

  return hundredYears;
}
