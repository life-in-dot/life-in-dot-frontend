import { atom } from "recoil";

const birthday = atom({
  key: "birthday",
  default: {
    year: 2000,
    month: 7,
    day: 1,
  },
});

export default birthday;
