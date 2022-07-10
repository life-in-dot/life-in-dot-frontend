import { selector } from "recoil";
import targetYearState from "./atom";
import birthdayState from "../user";

import calDatesOfYear from "../../utils/calDatesOfYear";
import calDatesData from "../../utils/calDatesData";

const daysListState = selector({
  key: "daysListState",
  get: ({ get }) => {
    const targetYear = get(targetYearState);
    const userBirthday = get(birthdayState);

    const datesOfTargetYear = calDatesOfYear(userBirthday, targetYear);
    const userOneYearData = calDatesData(datesOfTargetYear) || [];

    return userOneYearData;
  },
  set: ({ set }, newTargetYear) => set(targetYearState, newTargetYear),
});

export default daysListState;
