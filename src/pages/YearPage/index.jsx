import { lazy, Suspense } from "react";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import sidebarState from "../../lib/recoil/sidebar";

import Loading from "../../components/Loading";

const YearDot = lazy(() => import("../../components/YearDot"));
const RightSidebar = lazy(() => import("../../components/RightSidebar"));

function YearPage() {
  const isSidebarOpen = useRecoilValue(sidebarState);

  return (
    <Wrapper>
      <Suspense fallback={<Loading />}>
        <SVGWrapper sidebar={isSidebarOpen}>
          <YearDot></YearDot>
        </SVGWrapper>
        <RightSidebar></RightSidebar>
      </Suspense>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  height: calc(100vh - 70px);
  width: 100vw;
`;

const SVGWrapper = styled.div`
  flex: ${props => (props.sidebar ? "0 1 60%" : "0 100%")};
  transition: all 200ms ease-in 0s;
  height: 100%;
`;

export default YearPage;
