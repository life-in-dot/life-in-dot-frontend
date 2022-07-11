import { useRecoilState } from "recoil";

import styled from "styled-components";
import { IoIosMusicalNotes } from "react-icons/io";

import sidebarState from "../../lib/recoil/sidebar";

function RightSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);

  const onClickHandler = () => setIsSidebarOpen(false);
  return (
    <Sidebar sidebar={isSidebarOpen}>
      <AlbumWrapper onClick={onClickHandler}>
        <AlbumCoverWrapper>
          <AlbumCover></AlbumCover>
          <MusicIcon />
        </AlbumCoverWrapper>
      </AlbumWrapper>
      <JournalWrapper>
        <JournalTitle
          name="journal-title"
          placeholder="Write your title."
          defaultValue={"data.title"}
          onChange={e => {
            setArticleData(data => {
              data.title = e.target.value;
              return data;
            });
          }}
        />
        <JournalContents
          name="journal-contents"
          placeholder="Write your day."
          defaultValue={"data.contents"}
          onChange={e => {
            setArticleData(data => {
              data.title = e.target.value;
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
  background-color: #22bc5e;
  opacity: 0.7;
  transition: all 200ms ease-in 0s;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(34 188 94 / 15%);
`;

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40%;
  width: 100%;
`;

const AlbumCoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: all 200ms ease-in 0s;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(34 188 94 / 15%);
`;

const AlbumCover = styled.img``;

const MusicIcon = styled(IoIosMusicalNotes)`
  height: 30px;
  width: 30px;
`;

const JournalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
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

export default RightSidebar;
