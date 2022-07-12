import { atom } from "recoil";

const currentJournalDateIdState = atom({
  key: "currentJournalDateIdState",
  default: "",
});

export default currentJournalDateIdState;
