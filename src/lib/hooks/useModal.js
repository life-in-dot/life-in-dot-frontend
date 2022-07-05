import { useSetRecoilState } from "recoil";

import modalState from "../recoil/modal";

function useModal() {
  const setModalState = useSetRecoilState(modalState);

  const showModal = ({ modalType, modalProps }) => {
    setModalState({ modalType, modalProps });
  };

  const hideModal = () => {
    setModalState(null);
  };

  return {
    showModal,
    hideModal,
  };
}

export default useModal;
