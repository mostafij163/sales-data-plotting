const svg = d3.select("svg");
const g = svg.append("g") .attr("class", "map-path");
const width = +svg.attr("width");
const height = +svg.attr("height");

function spike(length, width = 10) {
  return `M${-width / 2},0L0,${-length}L${width / 2},0`;
}

const projection = d3
  .geoMercator()
  .scale(60000)
  .center([90.56423035, 23.79456711])
  .translate([width / 2, height / 2]);
const pathGenerator = d3.geoPath().projection(projection);
const radiusScale = d3.scaleSqrt();
const radiusValue = (d) => Number(d.TOTAL_Sales);

d3.json("https://raw.githubusercontent.com/techslides/D3-Maps/master/data/world/country/Bangladesh.topo.json").then((mapData) => {
  d3.csv("./geo2.csv").then((salesData) => {
    const areas = topojson.feature(mapData, mapData.objects.map);

    radiusScale.domain([0, d3.max(salesData, radiusValue)]).range([0, 1]);
    g.selectAll("path")
      .data(areas.features)
      .enter()
      .append("path")
      .attr("d", (d) => pathGenerator(d));

    // g.selectAll("circle")
    //   .data(salesData)
    //   .enter()
    //   .append("circle")
    //   .style("fill", "#03a9f4")
    //   .attr("cx", (d) => projection([Number(d.longitude)], Number(d.latitude))[0])
    //   .attr("cy", (d) => projection([Number(d.longitude), Number(d.latitude)])[1])
    //   .attr("r", (d) => radiusScale(radiusValue(d)));

    const formatedData = salesData.map((d) => ({
      position: [projection([Number(d.longitude)], Number(d.latitude))[0], projection([Number(d.longitude), Number(d.latitude)])[1]],
      TOTAL_Sales: d.TOTAL_Sales,
      Consumer_Footfall: d.Consumer_Footfall,
      LOW_Sales: d.LOW_Sales,
      LOWPLUS_SALES: d.LOWPLUS_SALES,
      VFM_Sales: d.VFM_Sales,
      AP_Sales: d.AP_Sales,
      P_Sales: d.P_Sales,
      title: "dummy title",
    }));

    svg
      .append("g")
      .attr("class", "total-sales")
      .selectAll("path")
      .data(formatedData.filter((d) => d.position).sort((a, b) => d3.ascending(a.position[1], b.position[1]) || d3.ascending(a.position[0], b.position[0])))
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) => spike(d3.scaleLinear([0, d3.max(formatedData, (d) => d.TOTAL_Sales)], [0, 200])(d.TOTAL_Sales)))
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.TOTAL_Sales)}`
      );

      svg
      .append("g")
      .attr("class", "consumer-footfall")
      .selectAll("path")
      .data(formatedData.filter((d) => d.position).sort((a, b) => d3.ascending(a.position[1], b.position[1]) || d3.ascending(a.position[0], b.position[0])))
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) => spike(d3.scaleLinear([0, d3.max(formatedData, (d) => d.Consumer_Footfall)], [0, 50])(d.Consumer_Footfall)))
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.Consumer_Footfall)}`
      );
  });
});

