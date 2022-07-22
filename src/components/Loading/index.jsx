import { useEffect, useRef } from "react";

import * as d3 from "d3";
import styled from "styled-components";

function Loading() {
  const svgRef = useRef();

  useEffect(() => {
    const viewWidth = window.innerWidth / 2;
    const viewHeight = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "year-svg")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox", [0, 0, viewWidth / 2, viewHeight / 2]);

    svg
      .transition()
      .duration(750)
      .attr("transform", `translate(0, 0) scale(100)`);
  }, []);

  return (
    <MainWrapper>
      <Main id="main-svg-ref" ref={svgRef} />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = styled.div`
  background: radial-gradient(#ec8686, #9da3e9);
  transition: all 200ms ease-in 0s;
  height: 100%;
  width: 100%;
`;

export default Loading;
