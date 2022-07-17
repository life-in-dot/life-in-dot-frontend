import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import { TbUserCircle } from "react-icons/tb";

import loginState, { isLoggedInState } from "../../lib/recoil/auth";

import useModal from "../../lib/hooks/useModal";

function AppHeader() {
  const { showModal } = useModal();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const loginData = useRecoilValue(loginState);

  const handleProfileClick = () => {
    showModal({
      modalType: "ProfileModal",
    });
  };

  return (
    <Header>
      <InnerHeader>
        <Link to={"/"}>
          <Brand>
            <BrandImage src="/assets/life-in-dot.png" />
            <BrandTitle>life in dot.</BrandTitle>
          </Brand>
        </Link>
        {isLoggedIn ? (
          <UserProfilePic
            src={loginData.data.picture}
            onClick={handleProfileClick}
          />
        ) : (
          <UserImage onClick={handleProfileClick} />
        )}
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
  padding: 8px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
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

const UserProfilePic = styled.img`
  margin-right: 15px;
  border-radius: 20px;
  height: 35px;
  width: 35px;
  opacity: 0.8;
  cursor: pointer;
`;
const UserImage = styled(TbUserCircle)`
  margin-right: 15px;
  height: 30px;
  width: 30px;
  opacity: 0.8;
  cursor: pointer;
`;

export default AppHeader;
