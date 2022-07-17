import { atom } from "recoil";

const yearDotCoordsState = atom({
  key: "yearDotCoordsState",
  default: {
    x: 0,
    y: 0,
    k: 1,
  },
});

export default yearDotCoordsState;
