import { atom } from "recoil";

const currentJournalIdState = atom({
  key: "currentJournalIdState",
  default: "",
});

export default currentJournalIdState;
