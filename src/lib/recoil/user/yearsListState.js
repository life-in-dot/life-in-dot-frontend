import { selector } from "recoil";
import birthdayState from "./atom";

import calculateYears from "../../utils/calculateYears";

const yearsListState = selector({
  key: "yearsListState",
  get: ({ get }) => {
    const { year } = get(birthdayState);
    const hundredYears = calculateYears(year);

    return hundredYears;
  },
  set: ({ set }, newBirthday) => set(birthdayState, newBirthday),
});

export default yearsListState;
