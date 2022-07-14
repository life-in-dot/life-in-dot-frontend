import { useLayoutEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import * as d3 from "d3";
import styled from "styled-components";

import birthday, { yearsListState } from "../../lib/recoil/user";
import targetYearState from "../../lib/recoil/days";
import dotCoordsState from "../../lib/recoil/coords";

import { makeRadialGradient } from "../../lib/utils/makeGradientColors";
import createTooltip from "../../lib/utils/createTooltip";

function LifeDot() {
  const navigate = useNavigate();
  const location = useLocation();
  const svgRef = useRef(null);
  const dateOfBirth = useRecoilValue(birthday);
  const userHundredYearsData = useRecoilValue(yearsListState);
  const setUserOneYearData = useSetRecoilState(targetYearState);
  const [dotCoords, setDotCoords] = useRecoilState(dotCoordsState);

  useLayoutEffect(() => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "life-board")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox", [0, 0, width, height]);

    const radialGradient = makeRadialGradient(svg, "normal");
    radialGradient.attr("id", "radial-gradient");

    const tooltip = createTooltip("#main-svg", 70);

    const gLife = svg.append("g", "life-board").attr("class", "life-dot");
    gLife
      .selectAll("circle")
      .data([10])
      .join("circle")
      .attr("r", d => d)
      .attr("cx", d => width / 2)
      .attr("cy", d => height / 2)
      .attr("fill", "url(#radial-gradient)")
      .attr("opacity", 0.7)
      .attr("box-shadow", "0 2px 5px 1px rgb(64 60 67 / 16%)")
      .append("animate")
      .attr("id", "animate-dots")
      .attr("attributeName", "r")
      .attr("values", "5;145;5")
      .attr("dur", "90s")
      .attr("repeatCount", "indefinite");

    const gYear = svg.append("g", "life-board").attr("class", "year-dots");
    gYear
      .selectAll("circle")
      .data(userHundredYearsData)
      .join("circle")
      .attr("r", d => d.r / 10)
      .attr("cx", d => width / 2 + d.y / 10 - 0.5)
      .attr("cy", d => height / 2 + d.x / 10 - 0.5)
      .attr("id", d => `${d.year}`)
      .attr("class", "year-dot")
      .attr("opacity", 0.7)
      .attr("fill", "url(#radial-gradient)")
      .attr("box-shadow", "0 2px 5px 1px rgb(64 60 67 / 16%)")
      .on("wheel", e => {
        const zoomScale = svg._groups[0][0].__zoom.k;
        const targetYear = e.target.getAttribute("id");

        if (zoomScale > 50000 && location.state !== "year") {
          setUserOneYearData(+targetYear);
          navigate("/year", { replace: false });
        }

        location.state = "";
      })
      .on("mouseover", (e, d) =>
        tooltip
          .style("visibility", "visible")
          .text(`It's ${d.year}, you're ${d.year - dateOfBirth.year + 1}`),
      )
      .on("mousemove", e =>
        tooltip
          .style("top", `${e.clientY - 60}px`)
          .style("left", `${e.clientX - 50}px`),
      )
      .on("mouseout", e => tooltip.style("visibility", "hidden"));

    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([0, Infinity]);

    svg
      .call(zoom.on("zoom", zoomed))
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(dotCoords.x, dotCoords.y).scale(dotCoords.k),
      );

    function zoomed({ transform }) {
      if (transform.k > 0) {
        setDotCoords({
          x: dotCoords.x + transform.x,
          y: dotCoords.y + transform.y,
          k: dotCoords.k + transform.k,
        });
      } else {
        setDotCoords({
          x: dotCoords.x + transform.x,
          y: dotCoords.y + transform.y,
          k: dotCoords.k - transform.k,
        });
      }

      gLife.attr("transform", transform);
      gYear.attr("transform", transform);
    }

    return () => {
      svgRef.current = null;
    };
  }, [setDotCoords, setUserOneYearData]);

  return (
    <MainWrapper id="main-svg">
      <Main ref={svgRef} style={{ overflow: "visible" }}></Main>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
`;

export default LifeDot;
