import ReactDom from "react-dom";

import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";

import useModal from "../../lib/hooks/useModal";

export default function ConfirmModal({ children }) {
  const { hideModal } = useModal();

  return ReactDom.createPortal(
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Brand>
          <CloseButton onClick={hideModal} />
          <BrandImage src="/assets/life-in-dot.png" />
          <BrandMessage>{children}</BrandMessage>
          <ConfirmButton onClick={hideModal}>확인</ConfirmButton>
        </Brand>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById("portal"),
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 350px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 30px 0 rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  z-index: 999999;
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

const BrandMessage = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  font-size: 1.2em;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  opacity: 0.8;
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

const ConfirmButton = styled(Button)`
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
