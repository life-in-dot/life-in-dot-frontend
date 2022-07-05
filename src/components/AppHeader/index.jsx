import styled from "styled-components";

function AppHeader() {
  return (
    <Header>
      <InnerHeader>
        <div>Brand Logo</div>
        <div>User Image</div>
      </InnerHeader>
    </Header>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 8px;
  height: 60px;
  width: 100%;
`;

const InnerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 1024px) {
    margin-left: 3%;
    margin-right: 3%;
  }
  margin-left: 10%;
  margin-right: 10%;
  transition: margin 1s ease 0s;
  height: 100%;
  width: 100%;
`;

export default AppHeader;
