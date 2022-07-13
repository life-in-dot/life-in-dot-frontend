import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosMusicalNotes } from "react-icons/io";

import loginState from "../../lib/recoil/auth";
import sidebarState from "../../lib/recoil/sidebar";
import journalIdState from "../../lib/recoil/currentJournal";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateIdState";
import currentMusicIdState from "../../lib/recoil/currentMusic";

import { getJournal, updateJournal } from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function RightSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);
  const [currentJournalId, setCurrentJournalId] =
    useRecoilState(journalIdState);
  const [currentJournalDateId, setCurrentJournalDateId] = useRecoilState(
    currentJournalDateIdState,
  );
  const [currentMusicId, setCurrentMusicId] =
    useRecoilState(currentMusicIdState);
  const [journalData, setJournalData] = useState({});
  const updateJournalMutation = useMutation(updateJournal);
  const loginData = useRecoilValue(loginState);
  const { showModal } = useModal();

  useEffect(() => {
    const interval = setInterval(() => {
      const userId = loginData?.data._id;
      try {
        if (
          isSidebarOpen &&
          currentJournalId &&
          currentJournalDateId &&
          journalData
        ) {
          updateJournalMutation.mutate({
            dateId: currentJournalDateId,
            userId,
            journalId: currentJournalId,
            journal: {
              title: journalData.title,
              contents: journalData.contents,
              contentsSize: journalData.contents?.length,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isSidebarOpen, currentJournalId, currentJournalDateId]);

  useEffect(() => {
    (async () => {
      const userId = loginData?.data._id;

      if (isSidebarOpen && currentJournalId) {
        const { data } = await getJournal(userId, currentJournalId);

        setJournalData(data);
        setCurrentJournalDateId(data.dateId);
        setCurrentJournalId(data._id);
      }
    })();
  }, [isSidebarOpen, currentJournalId]);

  const onMusicClickHandler = e => {
    e.stopPropagation();

    showModal({
      modalType: "SaveMusicModal",
    });
  };

  const onCloseClickHandler = e => {
    e.stopPropagation();

    setIsSidebarOpen(false);
    setCurrentJournalId("");
    setCurrentMusicId("");
    setJournalData({});
  };

  const onDeleteClickHandler = () => {
    showModal({
      modalType: "DeleteJournalModal",
    });
  };

  return (
    <Sidebar sidebar={isSidebarOpen}>
      <MusicWrapper onClick={onMusicClickHandler}>
        <CloseButton onClick={onCloseClickHandler} />
        <MusicCoverWrapper>
          {isSidebarOpen && (
            <>
              {currentMusicId ? (
                <MusicCover>
                  <iframe
                    className="iframe-player"
                    width="560"
                    height="300"
                    src={`https://www.youtube.com/embed/${journalData.musicUrl}?controls=0&fs=0&rel=0&autoplay=1&loop=100`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </MusicCover>
              ) : (
                <MusicIcon />
              )}
            </>
          )}
        </MusicCoverWrapper>
      </MusicWrapper>
      <JournalWrapper>
        <DeleteButton onClick={onDeleteClickHandler} />
        <JournalTitle
          name="journal-title"
          placeholder="Write your title."
          defaultValue={journalData.title}
          onChange={e => {
            setJournalData(data => {
              data.title = e.target.value;
              return data;
            });
          }}
        />
        <JournalContents
          name="journal-contents"
          placeholder="Write your day."
          defaultValue={journalData.contents}
          onChange={e => {
            setJournalData(data => {
              data.contents = e.target.value;
              return data;
            });
          }}
        ></JournalContents>
      </JournalWrapper>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  display: flex;
  position: sticky;
  flex: ${props => (props.sidebar ? "0 1 40%" : "0 1 0%")};
  top: 70px;
  height: calc(100vh - 70px);
  overflow: hidden scroll;
  overflow-y: scroll;
  flex-direction: column;
  background-color: #9affc1;
  opacity: 0.7;
  transition: all 200ms ease-in 0s;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(34 188 94 / 15%);
`;

const MusicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 100%;
  cursor: help;
`;

const MusicCoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: all 200ms ease-in 0s;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(34 188 94 / 15%);
`;

const MusicCover = styled.div`
  .iframe-player {
    pointer-events: none;
  }
`;

const MusicIcon = styled(IoIosMusicalNotes)`
  height: 30px;
  width: 30px;
`;

const JournalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: all 200ms ease-in 0s;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(34 188 94 / 15%);
`;

const JournalTitle = styled.input`
  padding: 0.7em;
  margin-top: 1em;
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 1em;
  width: 80%;
`;

const JournalContents = styled.textarea`
  padding: 0.7em;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: transparent;
  height: 100%;
  width: 80%;
  box-shadow: none;
  border: 0;
  outline: none;
  resize: none;
  overflow-y: scroll;
`;

const CloseButton = styled(AiOutlineMenuUnfold)`
  position: absolute;
  top: 3%;
  left: 3%;
  background-color: white;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const DeleteButton = styled(GrFormClose)`
  position: absolute;
  top: 40%;
  left: 88%;
  background-color: white;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  opacity: 0.7;
  border-radius: 10px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export default RightSidebar;
