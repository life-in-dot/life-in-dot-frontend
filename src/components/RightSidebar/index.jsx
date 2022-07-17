import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosMusicalNotes } from "react-icons/io";

import loginState from "../../lib/recoil/auth";
import sidebarState from "../../lib/recoil/sidebar";
import journalIdState from "../../lib/recoil/currentJournalId";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateId";
import currentMusicIdState from "../../lib/recoil/currentMusic";

import { getJournal, updateJournal } from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function RightSidebar() {
  const queryClient = useQueryClient();
  const { showModal } = useModal();

  const [journalData, setJournalData] = useState({});
  const loginData = useRecoilValue(loginState);
  const [isFetchDone, setIsFetchDone] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);
  const [currentJournalId, setCurrentJournalId] =
    useRecoilState(journalIdState);
  const [currentJournalDateId, setCurrentJournalDateId] = useRecoilState(
    currentJournalDateIdState,
  );
  const [currentMusicId, setCurrentMusicId] =
    useRecoilState(currentMusicIdState);
  const getJournalMutation = useMutation(getJournal);
  const updateJournalMutation = useMutation(updateJournal);

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
          if (journalData._id) {
            delete journalData._id;
          }

          updateJournalMutation.mutate(
            {
              dateId: currentJournalDateId,
              userId,
              journalId: currentJournalId,
              journalData,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("getJournalList");
              },
            },
          );
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isSidebarOpen, journalData, currentJournalId, currentJournalDateId]);

  useEffect(() => {
    (async () => {
      const userId = loginData?.data._id;

      if (isSidebarOpen && currentJournalId) {
        setIsFetchDone(false);

        getJournalMutation.mutate(
          {
            userId,
            journalId: currentJournalId,
          },
          {
            onSuccess: ({ data }) => {
              setJournalData(data);
              setCurrentJournalDateId(data.dateId);
              setCurrentJournalId(data._id);

              setIsFetchDone(true);
            },
          },
        );
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
    setJournalData({});

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
        {isFetchDone && (
          <>
            <JournalTitle
              name="journal-title"
              placeholder="Write your title."
              defaultValue={journalData.title}
              onChange={e =>
                setJournalData({
                  title: e.target.value,
                })
              }
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
            />
          </>
        )}
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
  background: radial-gradient(#ec8686, #9da3e9);
  opacity: 0.8;
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
  box-shadow: inset 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(34 188 94 / 15%);
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
