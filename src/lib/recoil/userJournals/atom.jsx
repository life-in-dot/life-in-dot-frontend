import { atom } from "recoil";

const userJournalsListState = atom({
  key: "userJournalsListState",
  default: [],
});

export default userJournalsListState;
