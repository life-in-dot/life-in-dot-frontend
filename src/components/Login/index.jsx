import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import loginState from "../../lib/recoil/auth";
import birthday, { hundredyearsListState } from "../../lib/recoil/userYears";

import { login } from "../../lib/api";
import config from "../../lib/config";
import useModal from "../../lib/hooks/useModal";

function Login() {
  const navigate = useNavigate();
  const { hideModal } = useModal();

  const dateOfBirth = useRecoilValue(birthday);
  const setLoginState = useSetRecoilState(loginState);
  const setUserHundredYearsData = useSetRecoilState(hundredyearsListState);
  const loginMutation = useMutation(login);

  const decodeJWT = token => {
    const userProfile = JSON.parse(window.atob(token.split(".")[1]));

    return userProfile;
  };

  const handleLogin = async response => {
    const { name, email, picture } = decodeJWT(response.credential);

    loginMutation.mutate(
      { name, email, picture, dateOfBirth },
      {
        onSuccess: ({ data }) => {
          setLoginState(data);
          localStorage.setItem("loginData", JSON.stringify(data));
          setUserHundredYearsData(data.data.dateOfBirth);

          hideModal();
          navigate("/year", { replace: true });
        },
      },
    );
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: config.CLIENT_ID,
      callback: handleLogin,
    });
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "large",
    });
  });

  return (
    <Wrapper>
      <CloseButton onClick={hideModal} />
      <LogoImage src="/assets/life-in-dot.png"></LogoImage>
      <GoogleButton>
        <div id="google-login"></div>
      </GoogleButton>
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
  margin-bottom: 60px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  border-radius: 100px;
  height: 60px;
  width: 60px;
`;

const GoogleButton = styled.div`
  opacity: 0.8;

  :hover {
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

export default Login;
