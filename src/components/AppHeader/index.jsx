import { Link } from "react-router-dom";

import styled from "styled-components";

function AppHeader() {
  return (
    <Header>
      <InnerHeader>
        <Link to={"/"}>
          <Brand>
            <BrandImage src="/life-in-dot.-favicon.png" />
            <BrandTitle>life in dot.</BrandTitle>
          </Brand>
        </Link>
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
  height: 70px;
  width: 100%;

  a {
    text-decoration: none;
    color: #2c3f3b;
  }
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

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BrandImage = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 15px;
`;

const BrandTitle = styled.div`
  font-size: 1.2em;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
`;

export default AppHeader;
