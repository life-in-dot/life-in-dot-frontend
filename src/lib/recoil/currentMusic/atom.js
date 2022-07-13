import { atom } from "recoil";

const currentMusicIdState = atom({
  key: "currentMusicIdState",
  default: "",
});

export default currentMusicIdState;
