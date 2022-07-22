export default function makeGlowEffect(svg, blurSize) {
  const defs = svg.append("defs");

  const glowFilter = defs.append("filter").attr("id", "glow-filter");
  glowFilter
    .append("feGaussianBlur")
    .attr("stdDeviation", `${blurSize}`)
    .attr("result", "colorBlur");

  const feMerge = glowFilter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "colorBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  return glowFilter;
}
