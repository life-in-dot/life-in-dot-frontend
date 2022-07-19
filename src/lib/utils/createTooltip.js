import * as d3 from "d3";

export default function createTooltip(id, width) {
  const tooltip = d3
    .select(`${id}`)
    .append("div")
    .attr("id", "tooltip")
    .style("display", "block")
    .style("position", "absolute")
    .style("width", `${width}px`)
    .style("opacity", 0.8)
    .style("font-size", "15px")
    .style("text-align", "center")
    .style("visibility", "hidden");

  return tooltip;
}
