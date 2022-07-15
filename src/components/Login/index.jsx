import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import loginState from "../../lib/recoil/auth";
import birthday from "../../lib/recoil/userYears";

import { login } from "../../lib/api";
import config from "../../lib/config";
import useModal from "../../lib/hooks/useModal";

function Login() {
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginState);
  const dateOfBirth = useRecoilValue(birthday);
  const loginMutation = useMutation(login);
  const { hideModal } = useModal();

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

          hideModal();
          navigate("/life", { replace: true });
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
      <LogoImage src="/assets/life-in-dot.-favicon.png"></LogoImage>
      <div id="google-login"></div>
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

const CloseButton = styled(GrFormClose)`
  position: absolute;
  top: 5%;
  left: 90%;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export default Login;
