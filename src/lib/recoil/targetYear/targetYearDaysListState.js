import { selector } from "recoil";
import targetYearState from "./atom";
import birthdayState from "../userYears";

import calDatesOfYear from "../../utils/calDatesOfYear";
import calDatesData from "../../utils/calDatesData";

const targetYearDaysListState = selector({
  key: "targetYearDaysListState",
  get: ({ get }) => {
    const targetYear = get(targetYearState);
    const userBirthday = get(birthdayState);

    const datesOfTargetYear = calDatesOfYear(userBirthday, targetYear);
    const userTargetYearData = calDatesData(datesOfTargetYear) || [];

    return userTargetYearData;
  },
  set: ({ set }, newTargetYear) => set(targetYearState, newTargetYear),
});

export default targetYearDaysListState;
