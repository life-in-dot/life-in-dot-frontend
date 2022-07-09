import styled from "styled-components";

import LifeDot from "../../components/LifeDot";

function LifePage() {
  return (
    <Wrapper>
      <LifeDot></LifeDot>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export default LifePage;
