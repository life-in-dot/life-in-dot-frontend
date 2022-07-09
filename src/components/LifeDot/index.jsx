import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import * as d3 from "d3";
import PropTypes from "prop-types";
import styled from "styled-components";

import { yearsListState } from "../../lib/recoil/user";

function LifeDot() {
  const navigate = useNavigate();
  const svgRef = useRef();
  const hundredYears = useRecoilValue(yearsListState);

  useEffect(() => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "life-board")
      .attr("viewBox", [0, 0, width, height]);

    const gLife = svg.append("g", "life-board").attr("class", "life-dot");
    gLife
      .selectAll("circle")
      .data([10])
      .join("circle")
      .attr("r", d => d)
      .attr("cx", (d, i) => width / 2)
      .attr("cy", (d, i) => height / 2)
      .attr("fill", "#22BC5E")
      .attr("stroke", "#BDE5EC")
      .attr("stroke-width", 3)
      .attr("opacity", 0.3);

    const gYear = svg.append("g", "life-board").attr("class", "year-dots");
    gYear
      .selectAll("circle")
      .data(hundredYears)
      .join("circle")
      .attr("r", d => d.r / 10)
      .attr("cx", (d, i) => width / 2 + d.y / 10)
      .attr("cy", (d, i) => height / 2 + d.x / 10)
      .attr("class", d => `${d.year}`)
      .attr("fill", "#22BC5E")
      .attr("stroke", "#BDE5EC")
      .attr("stroke-width", 0.003)
      .attr("opacity", 0.5)
      .on("wheel", event => {
        const zoomScale = svg._groups[0][0].__zoom.k;

        if (zoomScale > 50000) {
          event.target.style.transition = "opacity 1s ease-out";
          event.target.style.opacity = "0";

          navigate("/year", { replace: false });
        }
      });

    const zoomed = ({ transform }) => {
      gLife.attr("transform", transform);
      gYear.attr("transform", transform);
    };

    svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0, Infinity])
        .on("zoom", zoomed),
    );
  }, []);

  return <Main ref={svgRef} style={{ overflow: "visible" }}></Main>;
}

LifeDot.propTypes = {
  data: PropTypes.array,
  yearData: PropTypes.array,
};

const Main = styled.div`
  background-color: rgba(189, 229, 236, 0.3);
  height: 100%;
  width: 100%;
`;

export default LifeDot;
