import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import loginState from "../../lib/recoil/auth";
import sidebarState from "../../lib/recoil/sidebar";
import journalIdState from "../../lib/recoil/currentJournalId";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateId";

import { updateJournal } from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function SaveMusicModal() {
  const [musicUrlInput, setMusicUrlInput] = useState("");
  const [wrongInputWarn, setWrongInputWarn] = useState("");
  const setIsSidebarOpen = useSetRecoilState(sidebarState);
  const currentJournalDateId = useRecoilValue(currentJournalDateIdState);
  const currentJournalId = useRecoilValue(journalIdState);
  const updateJournalMutation = useMutation(updateJournal);
  const loginData = useRecoilValue(loginState);
  const { showModal, hideModal } = useModal();

  const handleSaveClick = () => {
    setWrongInputWarn(false);

    if (!musicUrlInput.startsWith("https://www.youtube.com/watch?v=")) {
      return setWrongInputWarn(true);
    }

    const musicUrl = musicUrlInput.split("watch?v=")[1];
    const userId = loginData?.data._id;

    updateJournalMutation.mutate(
      {
        dateId: currentJournalDateId,
        userId,
        journalId: currentJournalId,
        journalData: {
          musicUrl,
        },
      },
      {
        onSuccess: () => {
          setIsSidebarOpen(false);
          showModal({
            modalType: "ConfirmModal",
            modalProps: {
              message: "저장되었습니다.",
            },
          });
        },
      },
    );

    return null;
  };

  const handleChange = e => {
    setWrongInputWarn(false);
    const originalUrl = e.target.value;

    return setMusicUrlInput(originalUrl);
  };

  return (
    <Wrapper>
      <CloseButton onClick={hideModal} />
      <LogoImage src="/assets/life-in-dot.-favicon.png"></LogoImage>
      {wrongInputWarn ? (
        <p>올바르지 않은 URL 입니다.</p>
      ) : (
        <p>URL 을 입력해주세요.</p>
      )}
      <UrlInput
        type="url"
        pattern="https://.*"
        defaultvalue={musicUrlInput}
        onChange={handleChange}
        placeholder="Enter a URL of Youtube..."
      ></UrlInput>
      <ButtonWrapper>
        <ConfirmButton onClick={handleSaveClick}>Save</ConfirmButton>
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

const UrlInput = styled.input`
  padding: 0.7em;
  margin-top: 10px;
  border: 1px solid transparent;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 24px;
  padding: 2px 20px;
  height: 40px;
  width: 80%;
  font-size: 0.9em;
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

export default SaveMusicModal;
