import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import * as d3 from "d3";
import styled from "styled-components";

import { yearsListState } from "../../lib/recoil/user";
import targetYearState from "../../lib/recoil/days";
import dotCoordsState from "../../lib/recoil/coords";

function LifeDot() {
  const navigate = useNavigate();
  const location = useLocation();
  const svgRef = useRef();
  const userHundredYearsData = useRecoilValue(yearsListState);
  const setUserOneYearData = useSetRecoilState(targetYearState);
  const [dotCoords, setDotCoords] = useRecoilState(dotCoordsState);

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
      .data(userHundredYearsData)
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
        const targetYear = event.target.getAttribute("class");

        if (zoomScale > 50000 && location.state !== "year") {
          setUserOneYearData(+targetYear);
          navigate("/year", { replace: false });
        }

        location.state = "";
      })
      .on("mouseover", event => {
        const targetYear = event.target.getAttribute("class");

        event.target.style.stroke = "deeppink";
      })
      .on("mouseout", event => {
        event.target.style.stroke = "#BDE5EC";
      });

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
  }, [setDotCoords, setUserOneYearData]);

  return <Main ref={svgRef} style={{ overflow: "visible" }}></Main>;
}

const Main = styled.div`
  background-color: rgba(189, 229, 236, 0.3);
  height: 100%;
  width: 100%;
`;

export default LifeDot;
