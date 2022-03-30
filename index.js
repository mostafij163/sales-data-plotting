const svg = d3.select("svg");
const g = svg.append("g");

const projection = d3.geoMercator().scale(4000).translate([-5850, 2000]);
const pathGenerator = d3.geoPath().projection(projection);

d3.json("https://raw.githubusercontent.com/techslides/D3-Maps/master/data/world/country/Bangladesh.topo.json").then((mapData) => {
  d3.csv("./geo.csv").then((data) => {
    const areas = topojson.feature(mapData, mapData.objects.map);
    // const 

    const paths = g.selectAll("path").data(areas.features);
    paths
      .enter()
      .append("path")
      .attr("d", (d) => pathGenerator(d));

    g.selectAll("circle")
      .data(areas.features)
      .enter()
      .append("circle")
      .style("fill", "#03a9f4")
      .attr("cx", d => projection(d3.geoCentroid(d))[0])
      .attr("cy", d => projection(d3.geoCentroid(d))[1])
      .attr("r", 10)

  });
});
