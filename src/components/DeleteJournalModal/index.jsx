import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import loginState from "../../lib/recoil/auth";
import sidebarState from "../../lib/recoil/sidebar";
import currentJournalIdState from "../../lib/recoil/currentJournalId";
import currentMusicIdState from "../../lib/recoil/currentMusic";

import { deleteJournal } from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function DeleteJournalModal() {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();
  const loginData = useRecoilValue(loginState);

  const setIsSidebarOpen = useSetRecoilState(sidebarState);
  const [currentJournalId, setCurrentJournalId] = useRecoilState(
    currentJournalIdState,
  );
  const setCurrentMusicId = useSetRecoilState(currentMusicIdState);
  const deleteJournalMutation = useMutation(deleteJournal);

  const onDeleteClickHandler = () => {
    const userId = loginData?.data._id;

    deleteJournalMutation.mutate(
      { userId, journalId: currentJournalId },
      {
        onSuccess: () => {
          setCurrentMusicId("");
          setCurrentJournalId("");
          setIsSidebarOpen(false);
          hideModal();

          queryClient.invalidateQueries("getJournalList");
        },
      },
    );
  };

  return (
    <Wrapper>
      <CloseButton onClick={hideModal} />
      <LogoImage src="/assets/life-in-dot.png"></LogoImage>
      <ButtonWrapper>
        <ConfirmButton onClick={onDeleteClickHandler}>Delete</ConfirmButton>
        <ConfirmButton onClick={hideModal}>Close</ConfirmButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LogoImage = styled.img`
  margin-bottom: 40px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 100px;
  height: 60px;
  width: 60px;
`;

const CloseButton = styled(GrFormClose)`
  position: absolute;
  top: 5%;
  left: 90%;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const Button = styled.button`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
  height: 40px;
  width: 40%;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  margin: 40px auto;
  border: 1px solid #69c9bc;
  background: #69c9bc;
  opacity: 0.8;
  font-size: 1em;
  color: white;
`;

export default DeleteJournalModal;
