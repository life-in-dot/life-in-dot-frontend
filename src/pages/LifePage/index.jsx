import { Suspense } from "react";

import styled from "styled-components";

import Loading from "../../components/Loading";
import LifeDot from "../../components/LifeDot";

function LifePage() {
  return (
    <Wrapper>
      <Suspense fallback={<Loading />}>
        <LifeDot></LifeDot>
      </Suspense>
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
