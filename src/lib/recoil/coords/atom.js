import { atom } from "recoil";

const dotCoordsState = atom({
  key: "dotCoordsState",
  default: {
    x: 0,
    y: 0,
    k: 1,
  },
});

export default dotCoordsState;
