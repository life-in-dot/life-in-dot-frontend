import { useEffect, useRef } from "react";
import * as d3 from "d3";

import PropTypes from "prop-types";
import styled from "styled-components";

function LifeDot({ data, yearData }) {
  const svgRef = useRef();

  const userYearData = [];

  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      userYearData.push({
        r: 0.1,
        x: i,
        y: j,
      });
    }
  }

  useEffect(() => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const gLife = svg.append("g");
    gLife
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", d => d / 2)
      .attr("cx", (d, i) => width / 2 + 2 * i)
      .attr("cy", (d, i) => height / 2)
      .attr("fill", "#22BC5E")
      .attr("stroke", "#BDE5EC")
      .attr("stroke-width", 3)
      .attr("opacity", 0.3);

    const gYear = svg.append("g");
    gYear
      .selectAll("circle")
      .data(userYearData)
      .join("circle")
      .attr("r", d => d.r / 10)
      .attr("cx", (d, i) => width / 2 + d.x / 10)
      .attr("cy", (d, i) => height / 2 + d.y / 10)
      .attr("fill", "#22BC5E")
      .attr("stroke", "#BDE5EC")
      .attr("stroke-width", 0.003)
      .attr("opacity", 0.5);

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

const Main = styled.svg`
  background-color: rgba(189, 229, 236, 0.3);
  height: 100%;
  width: 100%;
`;

export default LifeDot;
