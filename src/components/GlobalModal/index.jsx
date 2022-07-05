import { useRecoilValue } from "recoil";

import modalState from "../../lib/recoil/modal";

import Modal from "../Modal";
import Login from "../Login";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState) || {};

  switch (modalType) {
    case "LoginModal":
      return (
        <Modal>
          <Login />
        </Modal>
      );
  }
}

export default GlobalModal;
