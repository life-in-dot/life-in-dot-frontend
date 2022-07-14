import * as d3 from "d3";

export function makeRadialGradient(svg, colorType) {
  let colorRange;

  if (colorType === "data") {
    colorRange = ["#FF9AEF", "#FF9AD7", "#ff5da2", "#FFCDEB"];
  } else {
    colorRange = ["#B6FDD2", "#9AFFC1", "#69C9BC", "#BDE5EC"];
  }

  const color = d3.scaleLinear().range(colorRange).domain([1, 2, 3, 4]);
  const radialGradient = svg.append("defs").append("radialGradient");

  radialGradient
    .append("stop")
    .attr("offset", "5%")
    .attr("stop-color", color(1));

  radialGradient
    .append("stop")
    .attr("offset", "15%")
    .attr("stop-color", color(2));

  radialGradient
    .append("stop")
    .attr("offset", "55%")
    .attr("stop-color", color(3));

  radialGradient
    .append("stop")
    .attr("offset", "95%")
    .attr("stop-color", color(4));

  return radialGradient;
}

export function makeLinearGradient(svg, colorArr) {
  const color = d3.scaleLinear().range(colorArr).domain([1, 2, 3]);

  const linearGradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "linear-gradient");

  linearGradient
    .append("stop")
    .attr("offset", "5%")
    .attr("stop-color", color(1));

  linearGradient
    .append("stop")
    .attr("offset", "10%")
    .attr("stop-color", color(2));

  linearGradient
    .append("stop")
    .attr("offset", "55%")
    .attr("stop-color", color(3));

  return linearGradient;
}
