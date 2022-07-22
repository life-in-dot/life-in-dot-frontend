import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useQueryClient } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import loginState from "../../lib/recoil/auth";
import sidebarState from "../../lib/recoil/sidebar";
import journalIdState from "../../lib/recoil/currentJournalId";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateId";

import { updateJournal } from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function SaveMusicModal() {
  const queryClient = useQueryClient();
  const { showModal, hideModal } = useModal();

  const [musicUrlInput, setMusicUrlInput] = useState("");
  const [wrongInputWarn, setWrongInputWarn] = useState("");
  const loginData = useRecoilValue(loginState);
  const currentJournalId = useRecoilValue(journalIdState);
  const currentJournalDateId = useRecoilValue(currentJournalDateIdState);

  const setIsSidebarOpen = useSetRecoilState(sidebarState);
  const updateJournalMutation = useMutation(updateJournal);

  const handleSaveClick = () => {
    setWrongInputWarn(false);

    let musicUrl;

    if (!musicUrlInput.startsWith("https://www.youtube.com/watch?v=")) {
      return setWrongInputWarn(true);
    }

    if (musicUrlInput.includes("&list=")) {
      const filteredMusicUrl = musicUrlInput.split("&list=")[0];
      const musirUrlStr = filteredMusicUrl.split("watch?v=")[1];

      musicUrl = musirUrlStr;
    } else {
      const musirUrlStr = musicUrlInput.split("watch?v=")[1];

      musicUrl = musirUrlStr;
    }

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
              message: "음악 링크가 저장되었습니다.",
            },
          });

          queryClient.invalidateQueries("getJournalList");
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
      <LogoImage src="/assets/life-in-dot.png"></LogoImage>
      {wrongInputWarn ? (
        <p>올바르지 않은 URL 입니다.</p>
      ) : (
        <UrlMessage>Youtube URL 을 입력해주세요.</UrlMessage>
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

const UrlMessage = styled.div`
  opacity: 0.8;
`;

const UrlInput = styled.input`
  padding: 0.7em;
  margin-top: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  border-radius: 24px;
  padding: 2px 20px;
  height: 40px;
  width: 80%;
  font-size: 0.9em;
  transition: all 200ms ease-in 0s;
  outline: none;

  :hover {
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 30px 0 rgba(255, 255, 255, 0.4);
    cursor: pointer;
  }
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

export default SaveMusicModal;
