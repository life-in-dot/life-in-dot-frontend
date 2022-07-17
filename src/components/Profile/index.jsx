import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";

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
`;

const BrandTitle = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  font-size: 1.2em;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
`;

const Button = styled.button`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
  height: 40px;
  width: 40%;
  cursor: pointer;
`;

const LogoutButton = styled(Button)`
  border: 1px solid #69c9bc;
  background: #69c9bc;
  opacity: 0.8;
  font-size: 1em;
  color: white;
`;

export default Profile;
