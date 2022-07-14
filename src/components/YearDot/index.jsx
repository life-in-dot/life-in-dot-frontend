import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery, useMutation, useQueryClient } from "react-query";

import * as d3 from "d3";
import styled from "styled-components";

import loginState from "../../lib/recoil/auth";
import { daysListState } from "../../lib/recoil/days";
import yearDataState from "../../lib/recoil/yearData";
import sidebarState from "../../lib/recoil/sidebar";
import currentJournalIdState from "../../lib/recoil/currentJournal";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateIdState";
import currentMusicIdState from "../../lib/recoil/currentMusic";

import { getJournalList, createJournal } from "../../lib/api";
import insertDataByDateId from "../../lib/utils/insertDataByDateId";
import { makeRadialGradient } from "../../lib/utils/makeGradientColors";
import createTooltip from "../../lib/utils/createTooltip";

function YearDot() {
  const navigate = useNavigate();
  const svgRef = useRef();
  const queryClient = useQueryClient();
  const userOneYearData = useRecoilValue(daysListState);
  const [userOneYearContents, setUserOneYearContents] =
    useRecoilState(yearDataState);
  const setIsSidebarOpen = useSetRecoilState(sidebarState);
  const setCurrentJournalId = useSetRecoilState(currentJournalIdState);
  const setCurrentJournalDateId = useSetRecoilState(currentJournalDateIdState);
  const setCurrentMusicId = useSetRecoilState(currentMusicIdState);
  const createJournalMutation = useMutation(createJournal);
  const loginData = useRecoilValue(loginState);
  const userId = loginData.data._id;

  const { data } = useQuery(
    ["getJournalList", userId],
    () => getJournalList(userId),
    {
      select: response => response.data,
      onSuccess: data => {
        setUserOneYearContents(insertDataByDateId(data, userOneYearData));
      },
    },
  );

  useLayoutEffect(() => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "year-board")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox", [0, 0, width / 2, height / 2 - 70])
      .on("wheel", () => {
        const zoomScale = svg._groups[0][0].__zoom.k;

        if (zoomScale < 1) {
          navigate("/life", { replace: false, state: "year" });
        }
      });

    const radialGradient = makeRadialGradient(svg, "normal");
    radialGradient.attr("id", "radial-gradient");

    const radialDataGradient = makeRadialGradient(svg, "data");
    radialDataGradient.attr("id", "radial-data-gradient");

    const tooltip = createTooltip("#main-svg", 90);

    const min = d3.min(data, d => d.contentsSize);
    const max = d3.max(data, d => d.contentsSize);

    const rScale = d3.scaleLinear().domain([min, max]).range([0.01, 0.04]);

    const gDay = svg
      .append("g", "year-board")
      .attr("class", "day-dots")
      .attr("transform", `translate(${0},${0})`);

    const dayDots = gDay
      .selectAll("circle")
      .data(userOneYearContents)
      .join("circle")
      .attr("r", d => (d.contentsSize ? rScale(d.contentsSize) : d.r * 5))
      .attr("cx", d => width / 5 + d.y * 4)
      .attr("cy", d => height / 12 + d.x * 4)
      .attr("id", d => d.dateId)
      .attr("journalId", d => d.journalId)
      .attr("musicUrl", d => d.musicUrl)
      .attr("fill", d =>
        d.journalId ? "url(#radial-data-gradient)" : "url(#radial-gradient)",
      )
      .attr("opacity", 0.5)
      .attr("cursor", "pointer")
      .on("mouseover", (e, d) => {
        const targetDate = e.target.getAttribute("id");
        const journalId = e.target.getAttribute("journalId");
        const musicUrl = e.target.getAttribute("musicUrl");

        tooltip.style("visibility", "visible").text(`${d.dateId}`);
      })
      .on("mousemove", e =>
        tooltip
          .style("top", `${e.clientY - 60}px`)
          .style("left", `${e.clientX - 50}px`),
      )
      .on("mouseout", e => tooltip.style("visibility", "hidden"))
      .on("click", e => {
        const targetDate = e.target.getAttribute("id");
        const journalId = e.target.getAttribute("journalId");
        const musicUrl = e.target.getAttribute("musicUrl");

        if (journalId) {
          setCurrentJournalId(journalId);
          setCurrentJournalDateId(targetDate);
          setIsSidebarOpen(true);
        } else {
          (async () => {
            const defaultJournal = {
              dateId: targetDate,
              title: "오늘의 제목",
              contents: "",
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
                  setIsSidebarOpen(true);

                  queryClient.invalidateQueries("getJournalList");
                },
              },
            );
          })();
        }

        if (musicUrl) {
          setCurrentMusicId(musicUrl);
        }
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

    return () => {
      svgRef.current = null;
    };
  }, [userOneYearContents]);

  return (
    <>
      {userOneYearContents && (
        <MainWrapper id="main-svg">
          <Main ref={svgRef} style={{ overflow: "visible" }}></Main>
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
  opacity: 0.8;
  transition: background-color 1s ease 0s;
  height: 100%;
  width: 100%;
`;

export default YearDot;
