import { useRecoilValue } from "recoil";

import modalState from "../../lib/recoil/modal";

import Modal from "../Modal";
import Login from "../Login";
import Profile from "../Profile";
import SaveMusicModal from "../SaveMusicModal";
import DeleteJournalModal from "../DeleteJournalModal";
import ConfirmModal from "../ConfirmModal";
import ErrorModal from "../ErrorModal";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState) || {};

  switch (modalType) {
    case "LoginModal":
      return (
        <Modal>
          <Login />
        </Modal>
      );
    case "SaveMusicModal":
      return (
        <Modal>
          <SaveMusicModal />
        </Modal>
      );
    case "DeleteJournalModal":
      return (
        <Modal>
          <DeleteJournalModal />
        </Modal>
      );
    case "ProfileModal":
      return (
        <Modal>
          <Profile />
        </Modal>
      );
    case "ConfirmModal":
      return <ConfirmModal>{modalProps.message}</ConfirmModal>;
    case "ErrorModal":
      return <ErrorModal>{modalProps.message}</ErrorModal>;
  }
}

export default GlobalModal;
