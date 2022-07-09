const increase = value => value + 1;
const decrease = value => value - 1;

const calYear = (deltaY, birthday, onChange) => {
  const { birthYear } = birthday;

  return deltaY > 0
    ? onChange({ target: { name: "birthYear", value: increase(birthYear) } })
    : onChange({ target: { name: "birthYear", value: decrease(birthYear) } });
};

const calMonth = (deltaY, birthday, onChange) => {
  const { birthMonth } = birthday;

  if (deltaY > 0) {
    return birthMonth > 11
      ? onChange({ target: { name: "birthMonth", value: 1 } })
      : onChange({
          target: { name: "birthMonth", value: increase(birthMonth) },
        });
  }

  return birthMonth < 2
    ? onChange({ target: { name: "birthMonth", value: 12 } })
    : onChange({ target: { name: "birthMonth", value: decrease(birthMonth) } });
};

const calDay = (deltaY, birthday, onChange) => {
  const { birthDate } = birthday;

  if (deltaY > 0) {
    return birthDate > 30
      ? onChange({ target: { name: "birthDate", value: 1 } })
      : onChange({ target: { name: "birthDate", value: increase(birthDate) } });
  }

  return birthDate < 2
    ? onChange({ target: { name: "birthDate", value: 31 } })
    : onChange({ target: { name: "birthDate", value: decrease(birthDate) } });
};

export default function calculateBirthday(e, birthday, onChange) {
  const targetName = e.target.name;
  const { deltaY } = e;

  switch (targetName) {
    case "year":
      calYear(deltaY, birthday, onChange);
      break;
    case "month":
      calMonth(deltaY, birthday, onChange);
      break;
    case "date":
      calDay(deltaY, birthday, onChange);
      break;
  }
}
