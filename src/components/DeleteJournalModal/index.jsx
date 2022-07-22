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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const Button = styled.button`
  border-radius: 10px;
  height: 40px;
  width: 40%;
  box-shadow: 0 2px 15px 0 rgba(105, 201, 188, 0.4);
  transition: all 200ms ease-in 0s;

  :hover {
    opacity: 0.8;
    box-shadow: 0 2px 15px 0 rgba(105, 201, 188, 0.8);
    cursor: pointer;
  }
`;

const ConfirmButton = styled(Button)`
  margin: 40px auto;
  border: none;
  background: rgba(105, 201, 188, 0.6);
  opacity: 0.8;
  font-size: 1em;
  color: white;
  transition: all 200ms ease-in 0s;

  :hover {
    background: rgba(105, 201, 188, 0.8);
    box-shadow: 0 2px 15px 0 rgba(105, 201, 188, 0.9);
    opacity: 1;
  }
`;

const CloseButton = styled(GrFormClose)`
  position: absolute;
  top: 5%;
  left: 90%;
  height: 30px;
  width: 30px;
  opacity: 0.7;
  cursor: pointer;
`;

export default DeleteJournalModal;
