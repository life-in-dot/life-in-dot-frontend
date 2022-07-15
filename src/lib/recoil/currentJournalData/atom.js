import { atom } from "recoil";

const currentJournalDataState = atom({
  key: "currentJournalDataState",
  default: {},
});

export default currentJournalDataState;
