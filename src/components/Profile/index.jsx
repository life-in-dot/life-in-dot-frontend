import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import loginState from "../../lib/recoil/auth";
import useModal from "../../lib/hooks/useModal";

function Profile() {
  const navigate = useNavigate();
  const { hideModal } = useModal();
  const setLoginState = useSetRecoilState(loginState);

  const handleLogout = () => {
    localStorage.clear();
    setLoginState(null);

    hideModal();

    navigate("/");
  };

  return (
    <Wrapper>
      <CloseButton onClick={hideModal} />
      <Brand>
        <BrandImage src="/assets/life-in-dot.png" />
        <BrandTitle>life in dot.</BrandTitle>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Brand>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const BrandImage = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 15px;
  box-shadow: 0 2px 10px 1px rgba(105, 201, 188, 0.4);
  border-radius: 100px;
`;

const BrandTitle = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  font-size: 1.2em;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
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

const LogoutButton = styled(Button)`
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

export default Profile;
