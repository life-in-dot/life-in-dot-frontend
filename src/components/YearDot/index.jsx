import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery, useMutation, useQueryClient } from "react-query";

import * as d3 from "d3";
import styled from "styled-components";

import loginState from "../../lib/recoil/auth";
import sidebarState from "../../lib/recoil/sidebar";
import { targetYearDaysListState } from "../../lib/recoil/targetYear";
import targetYearContentsListState from "../../lib/recoil/yearContents";
import userJournalListState from "../../lib/recoil/userJournals";
import currentJournalIdState from "../../lib/recoil/currentJournalId";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateId";
import currentMusicIdState from "../../lib/recoil/currentMusic";
import dayDotCoordsState from "../../lib/recoil/dayDotCoords";

import { getJournalList, createJournal } from "../../lib/api";
import insertDataByDateId from "../../lib/utils/insertDataByDateId";
import { makeRadialGradient } from "../../lib/utils/makeGradientColors";
import createTooltip from "../../lib/utils/createTooltip";
import createAxis from "../../lib/utils/createAxis";

function YearDot() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const svgRef = useRef();

  const userTargetYearData = useRecoilValue(targetYearDaysListState);
  const loginData = useRecoilValue(loginState);
  const userId = loginData.data._id;

  const [userTargetYearContents, setUserTargetYearContents] = useRecoilState(
    targetYearContentsListState,
  );
  const [userJournalList, setUserJournalList] =
    useRecoilState(userJournalListState);

  const setIsSidebarOpen = useSetRecoilState(sidebarState);
  const setCurrentJournalId = useSetRecoilState(currentJournalIdState);
  const setCurrentJournalDateId = useSetRecoilState(currentJournalDateIdState);
  const setCurrentMusicId = useSetRecoilState(currentMusicIdState);
  const [dotCoords, setDotCoords] = useRecoilState(dayDotCoordsState);
  const createJournalMutation = useMutation(createJournal);

  const { data } = useQuery(
    ["getJournalList", userId],
    () => getJournalList({ userId }),
    {
      enabled: !!userId,
      select: response => response.data,
      onSuccess: data => {
        setUserTargetYearContents(insertDataByDateId(data, userTargetYearData));
        setUserJournalList(data);
      },
    },
  );

  useEffect(() => {
    const viewWidth = window.innerWidth / 2;
    const viewHeight = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "year-svg")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox", [0, 0, viewWidth / 2, viewHeight / 2])
      .on("wheel touchmove", e => {
        const zoomScale = svg._groups[0][0].__zoom.k;

        if (zoomScale < 1.2 && e.deltaY > 0) {
          setIsSidebarOpen(false);

          navigate("/year", { replace: false, state: "day" });
        }

        if (zoomScale > 10000) {
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

    const tooltip = createTooltip("#main-svg-wrapper", 90);

    const min = d3.min(userJournalList, d => d.contentsSize);
    const max = d3.max(userJournalList, d => d.contentsSize);
    const rScale = d3.scaleLinear().domain([min, max]).range([0.02, 0.04]);

    const gDay = svg.append("g", "year-board").attr("class", "day-dots");

    const dayDots = gDay
      .selectAll("circle")
      .data(userTargetYearContents)
      .join("circle")
      .attr("r", d => (d.contentsSize ? rScale(d.contentsSize) : d.r * 5))
      .attr("cx", d => viewWidth / 5 + d.y * 5)
      .attr("cy", d => viewHeight / 12 + d.x * 5)
      .attr("id", d => d.dateId)
      .attr("journalId", d => d.journalId)
      .attr("musicUrl", d => d.musicUrl)
      .attr("fill", d =>
        d.journalId ? "url(#radial-data-gradient)" : "url(#radial-gradient)",
      )
      .attr("opacity", 0.5)
      .attr("cursor", "pointer")
      .on("mouseover touchstart pointerover", (e, d) => {
        tooltip.style("visibility", "visible").text(`${d.dateId}`);
      })
      .on("mousemove touchstart pointermove", e =>
        tooltip
          .style("top", `${e.clientY - 60}px`)
          .style("left", `${e.clientX - 50}px`),
      )
      .on("mouseout touchend pointerout", () =>
        tooltip.style("visibility", "hidden"),
      )
      .on("click pointerdown", e => {
        const targetDate = e.target.getAttribute("id");
        const journalId = e.target.getAttribute("journalId");
        const musicUrl = e.target.getAttribute("musicUrl");
        const [year, month, date] = targetDate.split("-");

        if (musicUrl) {
          setCurrentMusicId(musicUrl);
        }

        if (journalId) {
          setCurrentJournalId(journalId);
          setCurrentJournalDateId(targetDate);
          setCurrentMusicId(musicUrl);
          setIsSidebarOpen(true);
        } else {
          (async () => {
            const defaultJournal = {
              dateId: targetDate,
              title: `오늘은 ${year}년 ${month}월 ${date}일`,
              contents: "",
              musicUrl: "",
            };

            createJournalMutation.mutate(
              {
                userId,
                journalData: {
                  ...defaultJournal,
                },
              },
              {
                onSuccess: ({ data }) => {
                  setCurrentJournalId(data._id);
                  setCurrentJournalDateId(targetDate);
                  setCurrentMusicId(data.musicUrl);
                  setIsSidebarOpen(true);

                  queryClient.invalidateQueries("getJournalList");
                },
              },
            );
          })();
        }
      });

    const gyAxis = createAxis(gDay, "yAxisDay", ".day-dots");
    gyAxis.attr(
      "transform",
      `translate(${viewWidth / 5 + 3},${viewHeight / 12})`,
    );

    const gxAxis = createAxis(gDay, "xAxisMonth", ".day-dots");
    gxAxis.attr(
      "transform",
      `translate(${viewWidth / 5 + 3},${viewHeight / 11 - 0.5})`,
    );

    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [viewWidth, viewHeight],
      ])
      .scaleExtent([0, Infinity]);

    const zoomed = ({ transform }) => {
      setDotCoords({
        x: transform.x,
        y: transform.y,
        k: transform.k,
      });

      gDay.attr("transform", transform);
    };

    svg
      .call(zoom.on("zoom", zoomed))
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(dotCoords.x, dotCoords.y).scale(dotCoords.k),
      );

    const refToCleanUp = svgRef.current;
    const mainSvgWrapper = document.querySelector("#main-svg-wrapper");
    const tooltipDiv = document.querySelector("#tooltip");

    return () => {
      if (refToCleanUp) {
        refToCleanUp.innerHTML = "";
      }

      mainSvgWrapper?.removeChild(tooltipDiv);
    };
  }, [userTargetYearContents, userJournalList, data]);

  return (
    <>
      {userTargetYearContents && (
        <MainWrapper id="main-svg-wrapper">
          <Main
            id="main-svg-ref"
            ref={svgRef}
            style={{ overflow: "visible" }}
          ></Main>
        </MainWrapper>
      )}
    </>
  );
}

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = styled.div`
  background: radial-gradient(#ec8686, #9da3e9);
  transition: background-color 1s ease 0s;
  height: 100%;
  width: 100%;
`;

export default YearDot;
