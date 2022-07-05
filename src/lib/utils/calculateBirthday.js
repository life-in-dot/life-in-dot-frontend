const increase = value => value + 1;
const decrease = value => value - 1;

const calYear = (deltaY, birthday, setBirthday) => {
  const { year } = birthday;

  return deltaY > 0
    ? setBirthday(prevState => ({ ...prevState, year: increase(year) }))
    : setBirthday(prevState => ({ ...prevState, year: decrease(year) }));
};

const calMonth = (deltaY, birthday, setBirthday) => {
  const { month } = birthday;

  if (deltaY > 0) {
    return month > 11
      ? setBirthday(prevState => ({ ...prevState, month: 1 }))
      : setBirthday(prevState => ({ ...prevState, month: increase(month) }));
  }

  return month < 2
    ? setBirthday(prevState => ({ ...prevState, month: 12 }))
    : setBirthday(prevState => ({ ...prevState, month: decrease(month) }));
};

const calDay = (deltaY, birthday, setBirthday) => {
  const { day } = birthday;

  if (deltaY > 0) {
    return day > 30
      ? setBirthday(prevState => ({ ...prevState, day: 1 }))
      : setBirthday(prevState => ({ ...prevState, day: increase(day) }));
  }

  return day < 2
    ? setBirthday(prevState => ({ ...prevState, day: 31 }))
    : setBirthday(prevState => ({ ...prevState, day: decrease(day) }));
};

export default function calculateBirthday(e, birthday, setBirthday) {
  const targetName = e.target.name;
  const { deltaY } = e;

  switch (targetName) {
    case "year":
      calYear(deltaY, birthday, setBirthday);
      break;
    case "month":
      calMonth(deltaY, birthday, setBirthday);
      break;
    case "day":
      calDay(deltaY, birthday, setBirthday);
      break;
    default:
  }
}
