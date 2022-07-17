import { atom } from "recoil";

const lifedotCoordsState = atom({
  key: "lifedotCoordsState",
  default: {
    x: 0,
    y: 0,
    k: 1,
  },
});

export default lifedotCoordsState;
