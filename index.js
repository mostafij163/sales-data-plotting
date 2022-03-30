const svg = d3.select("svg");
const g = svg.append("g");

const projection = d3.geoMercator().scale(4000).translate([-5850, 2000]);
const pathGenerator = d3.geoPath().projection(projection);
const radiusScale = d3.scaleSqrt();
const radiusValue = d => Number(d.Total_Sales)

d3.json("https://raw.githubusercontent.com/techslides/D3-Maps/master/data/world/country/Bangladesh.topo.json").then((mapData) => {
  d3.csv("./geo.csv").then((salesData) => {
    const areas = topojson.feature(mapData, mapData.objects.map);

    radiusScale.domain([0, d3.max(salesData, radiusValue)]).range([0,5])
    const paths = g.selectAll("path").data(areas.features);
    paths
      .enter()
      .append("path")
      .attr("d", (d) => pathGenerator(d));

    g.selectAll("circle")
      .data(salesData)
      .enter()
      .append("circle")
      .style("fill", "#03a9f4")
      .attr("cx", (d) => projection([Number(d.longitude)], Number(d.latitude))[0])
      .attr("cy", (d) => projection([Number(d.longitude), Number(d.latitude)])[1])
      .attr("r", d => radiusScale(radiusValue(d)));
  });
});
