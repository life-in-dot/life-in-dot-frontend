import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";

import * as d3 from "d3";
import styled from "styled-components";

import loginState from "../../lib/recoil/auth";
import birthday, { hundredyearsListState } from "../../lib/recoil/userYears";
import targetYearState, {
  targetYearDaysListState,
} from "../../lib/recoil/targetYear";
import targetYearContentsListState from "../../lib/recoil/yearContents";
import userJournalListState from "../../lib/recoil/userJournals";
import yearDotCoordsState from "../../lib/recoil/yearDotCoords";
import dayDotCoordsState from "../../lib/recoil/dayDotCoords";

import { getJournalList } from "../../lib/api";
import insertDataByDateId from "../../lib/utils/insertDataByDateId";
import { makeRadialGradient } from "../../lib/utils/makeGradientColors";
import createTooltip from "../../lib/utils/createTooltip";

function LifeDot() {
  const navigate = useNavigate();
  const location = useLocation();
  const svgRef = useRef(null);

  const userHundredYearsData = useRecoilValue(hundredyearsListState);
  const userTargetYearData = useRecoilValue(targetYearDaysListState);
  const dateOfBirth = useRecoilValue(birthday);
  const loginData = useRecoilValue(loginState);
  const userId = loginData.data._id;

  const setUserTargetYear = useSetRecoilState(targetYearState);
  const setUserTargetYearContents = useSetRecoilState(
    targetYearContentsListState,
  );
  const setUserJournalList = useSetRecoilState(userJournalListState);
  const [dotCoords, setDotCoords] = useRecoilState(yearDotCoordsState);
  const setDayDotCoords = useSetRecoilState(dayDotCoordsState);
  const getJournalListMutation = useMutation(getJournalList);

  useEffect(() => {
    getJournalListMutation.mutate(
      {
        userId,
      },
      {
        onSuccess: ({ data }) => {
          setUserTargetYearContents(
            insertDataByDateId(data, userTargetYearData),
          );

          setUserJournalList(data);
        },
      },
    );
  }, [userTargetYearData]);

  useEffect(() => {
    const FIRST_DOT_SIZE = 10;
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "life-board")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox", [0, 0, width, height])
      .on("wheel", () => {
        const zoomScale = svg._groups[0][0].__zoom.k;

        if (zoomScale < 0.1) {
          setDotCoords({
            x: 0,
            y: 0,
            k: 1,
          });

          svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
        }

        if (zoomScale > 80000) {
          setDotCoords({
            x: 0,
            y: 0,
            k: 1,
          });

          svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
        }
      });

    const radialGradient = makeRadialGradient(svg, "normal");
    radialGradient.attr("id", "radial-gradient");

    const radialDataGradient = makeRadialGradient(svg, "data");
    radialDataGradient.attr("id", "radial-data-gradient");

    const tooltip = createTooltip("#main-svg", 70);

    const gLife = svg.append("g", "life-board").attr("class", "life-dot");
    gLife
      .selectAll("circle")
      .data([FIRST_DOT_SIZE])
      .join("circle")
      .attr("r", d => d)
      .attr("cx", () => width / 2)
      .attr("cy", () => height / 2)
      .attr("fill", "url(#radial-gradient)")
      .attr("opacity", 0.8)
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
      .attr("cx", d => width / 2 + d.y / 10 - d.r * 5)
      .attr("cy", d => height / 2 + d.x / 10 - d.r * 5)
      .attr("id", d => `${d.year}`)
      .attr("class", "year-dot")
      .attr("fill", "url(#radial-gradient)")
      .on("wheel touchmove", e => {
        const zoomScale = svg._groups[0][0].__zoom.k;
        const targetYear = e.target.getAttribute("id");

        if (zoomScale > 15000) {
          setUserTargetYear(+targetYear);
        }

        if (zoomScale > 20000 && e.deltaY < 0 && location.state !== "day") {
          setDayDotCoords({
            x: 0,
            y: 0,
            k: 1,
          });

          navigate("/day", { replace: false });
        }

        location.state = "";
      })
      .on("mouseover touchstart pointerover", (e, d) => {
        tooltip
          .style("visibility", "visible")
          .text(`It's ${d.year}, you're ${d.year - dateOfBirth.year + 1}`);

        e.target.style.fill = "url(#radial-data-gradient)";
      })
      .on("mousemove touchstart pointermove", e =>
        tooltip
          .style("top", `${e.clientY - 60}px`)
          .style("left", `${e.clientX - 50}px`),
      )
      .on("mouseout touchend pointerout", e => {
        tooltip.style("visibility", "hidden");

        e.target.style.fill = "url(#radial-gradient)";
      });

    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([0, Infinity]);

    const zoomed = ({ transform }) => {
      setDotCoords({
        x: transform.x,
        y: transform.y,
        k: transform.k,
      });

      gLife.attr("transform", transform);
      gYear.attr("transform", transform);
    };

    svg
      .call(zoom.on("zoom", zoomed))
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(dotCoords.x, dotCoords.y).scale(dotCoords.k),
      );

    return () => {
      svgRef.current = null;
    };
  }, [userHundredYearsData, setDotCoords]);

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
