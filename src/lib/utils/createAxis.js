import * as d3 from "d3";

export default function createAxis(gElements, axisType, id) {
  let axis;

  if (axisType === "yAxisDay") {
    const elementGroup = document.querySelector(`${id}`);
    const yAxisHeight = elementGroup.getBBox().height;

    const yAxisScale = d3
      .scaleLinear()
      .domain([1, 31])
      .range([yAxisHeight / 31, yAxisHeight + yAxisHeight / 62]);

    axis = d3.axisLeft(yAxisScale);
  }

  if (axisType === "xAxisMonth") {
    const xAxisData = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const elementGroup = document.querySelector(`${id}`);
    const xAxisWidth = elementGroup.getBBox().width;

    const xAxisScale = d3
      .scalePoint()
      .domain(xAxisData)
      .range([1, xAxisWidth - xAxisWidth / 15]);

    axis = d3.axisTop(xAxisScale);
  }

  const gAxis = gElements
    .append("g")
    .attr("id", `${axisType}`)
    .style("font-size", "0.06rem")
    .style("color", "#2c3f3b")
    .style("opacity", 0.4);

  axis.ticks(31);
  axis.tickPadding(1);
  axis.tickSizeInner(1);
  axis.tickSizeOuter(1);
  axis(gAxis);

  gAxis.selectAll("path").join("path").attr("stroke-width", 0);

  gAxis.selectAll("line").join("line").attr("stroke-width", 0);

  return gAxis;
}
