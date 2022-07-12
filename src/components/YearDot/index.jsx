import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";

import * as d3 from "d3";
import styled from "styled-components";

import loginState from "../../lib/recoil/auth";
import { daysListState } from "../../lib/recoil/days";
import yearDataState from "../../lib/recoil/yearData";
import sidebarState from "../../lib/recoil/sidebar";
import currentJournalIdState from "../../lib/recoil/currentJournal";
import currentJournalDateIdState from "../../lib/recoil/currentJournalDateIdState";

import { getJournalList, createJournal } from "../../lib/api";
import insertDataByDateId from "../../lib/utils/insertDataByDateId";

function YearDot() {
  const navigate = useNavigate();
  const svgRef = useRef();
  const userOneYearData = useRecoilValue(daysListState);
  const [userOneYearContents, setUserOneYearContents] =
    useRecoilState(yearDataState);
  const setIsSidebarOpen = useSetRecoilState(sidebarState);
  const setCurrentJournalId = useSetRecoilState(currentJournalIdState);
  const setCurrentJournalDateId = useSetRecoilState(currentJournalDateIdState);
  const loginData = useRecoilValue(loginState);
  const userId = loginData.data._id;

  const { data } = useQuery(
    ["getJournalList", userId],
    () => getJournalList(userId),
    {
      select: response => response.data,
      onSuccess: data =>
        setUserOneYearContents(insertDataByDateId(data, userOneYearData)),
    },
  );

  useEffect(() => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "year-board")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("viewBox", [0, 0, width, height - 70])
      .on("wheel", event => {
        const zoomScale = svg._groups[0][0].__zoom.k;

        if (zoomScale < 1) {
          navigate("/life", { replace: false, state: "year" });
        }
      });

    const gDay = svg
      .append("g", "year-board")
      .attr("class", "day-dots")
      .attr("transform", `translate(${0},${0})`);

    const dayDots = gDay
      .selectAll("circle")
      .data(userOneYearContents)
      .join("circle")
      .attr("r", d => d.r / 10)
      .attr("cx", (d, i) => width / 2 + d.y / 10)
      .attr("cy", (d, i) => height / 2 + d.x / 10)
      .attr("id", d => d.dateId)
      .attr("journalId", d => d.journalId)
      .attr("fill", d => (d.journalId ? "deeppink" : "#9AFFC1"))
      .attr("stroke", "#69C9BC")
      .attr("stroke-width", 0.003)
      .attr("opacity", 0.5)
      .on("mouseover", event => {
        const targetDate = event.target.getAttribute("id");
        const journalId = event.target.getAttribute("journalId");

        event.target.style.fill = "deeppink";
      })
      .on("mouseout", event => {
        const journalId = event.target.getAttribute("journalId");

        if (journalId) {
          event.target.style.fill = "deeppink";
        } else {
          event.target.style.fill = "#9AFFC1";
        }
      })
      .on("click", event => {
        const targetDate = event.target.getAttribute("id");
        const journalId = event.target.getAttribute("journalId");
        event.target.style.fill = "deeppink";

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

            const { data } = await createJournal(userId, defaultJournal);

            setCurrentJournalId(data._id);
            setCurrentJournalDateId(targetDate);
            setIsSidebarOpen(true);
          })();
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
  }, []);

  return (
    <>
      {userOneYearContents && (
        <Main ref={svgRef} style={{ overflow: "visible" }}></Main>
      )}
    </>
  );
}

const Main = styled.div`
  background-color: #9affc1;
  opacity: 0.8;
  transition: background-color 1s ease 0s;
  height: 100%;
  width: 100%;
`;

export default YearDot;
