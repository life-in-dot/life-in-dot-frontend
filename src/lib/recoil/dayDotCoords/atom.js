import { atom } from "recoil";

const dayDotCoordsState = atom({
  key: "dayDotCoordsState",
  default: {
    x: 0,
    y: 0,
    k: 1,
  },
});

export default dayDotCoordsState;
