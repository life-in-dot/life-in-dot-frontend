import { selector } from "recoil";
import birthdayState from "./atom";

import calHundredYearsData from "../../utils/calHundredYearsData";

const hundredyearsListState = selector({
  key: "hundredyearsListState",
  get: ({ get }) => {
    const { year } = get(birthdayState);
    const userHundredYearsData = calHundredYearsData(year);

    return userHundredYearsData;
  },
  set: ({ set }, newBirthday) => set(birthdayState, newBirthday),
});

export default hundredyearsListState;
