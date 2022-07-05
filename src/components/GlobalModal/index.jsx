import { useRecoilValue } from "recoil";

import modalState from "../../lib/recoil/modal";

import Modal from "../Modal";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState) || {};

  switch (modalType) {
    case "LoginModal":
      return <Modal></Modal>;
  }
}

export default GlobalModal;
