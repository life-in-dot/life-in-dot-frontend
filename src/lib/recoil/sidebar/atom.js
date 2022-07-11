import { atom } from "recoil";

const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

export default sidebarState;
