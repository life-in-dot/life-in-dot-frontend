import { atom } from "recoil";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

const birthdayState = atom({
  key: "birthdayState",
  default: localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData")).data.dateOfBirth
    : {
        year: year - 25,
        month,
        date,
      },
});

export default birthdayState;
