import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import * as d3 from "d3";
import styled from "styled-components";

import { daysListState } from "../../lib/recoil/days";

function YearDot() {
  const svgRef = useRef();
  const userOneYearData = useRecoilValue(daysListState);

  useEffect(() => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "year-board")
      .attr("viewBox", [0, 0, width, height - 70]);

    const gDay = svg
      .append("g", "year-board")
      .attr("class", "day-dots")
      .attr("transform", `translate(${0},${0})`);

    const dayDots = gDay
      .selectAll("circle")
      .data(userOneYearData)
      .join("circle")
      .attr("r", d => d.r / 10)
      .attr("cx", (d, i) => width / 2 + d.y / 10)
      .attr("cy", (d, i) => height / 2 + d.x / 10)
      .attr("class", d => `${d.year}-${d.month}-${d.date}`)
      .attr("fill", "#22BC5E")
      .attr("stroke", "#BDE5EC")
      .attr("stroke-width", 0.003)
      .attr("opacity", 0.5)
      .on("mouseover", event => {
        const zoomScale = svg._groups[0][0].__zoom.k;
        const targetDate = event.target.getAttribute("class");
        event.target.style.fill = "deeppink";
      })
      .on("mouseout", event => {
        event.target.style.fill = "none";
      });

    const zoomed = ({ transform }) => {
      gDay.attr("transform", transform);
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
  }, [userOneYearData]);

  return <Main ref={svgRef} style={{ overflow: "visible" }}></Main>;
}

const Main = styled.div`
  background-color: #22bc5e;
  opacity: 0.7;
  transition: background-color 1s ease 0s;
  height: 100%;
  width: 100%;
`;

export default YearDot;
