import { lazy, Suspense } from "react";

import styled from "styled-components";

import Loading from "../../components/Loading";

const LifeDot = lazy(() => import("../../components/LifeDot"));

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
  margin-top: 70px;
  height: calc(100vh - 70px);
  width: 100vw;
`;

export default LifePage;
