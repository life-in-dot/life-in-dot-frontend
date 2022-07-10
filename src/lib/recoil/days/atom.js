import { atom } from "recoil";

const today = new Date();
const year = today.getFullYear();

const targetYearState = atom({
  key: "targetYearState",
  default: year,
});

export default targetYearState;
