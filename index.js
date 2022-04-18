const svg = d3.select("svg");
const g = svg.append("g").attr("class", "map-path");
const width = +svg.attr("width");
const height = +svg.attr("height");

function spike(length, width = 10) {
  return `M${-width / 2},0L0,${-length}L${width / 2},0`;
}

const projection = d3
  .geoMercator()
  .scale(15000)
  .center([90.56423035, 23.79456711])
  .translate([width / 2, height / 2]);
const pathGenerator = d3.geoPath().projection(projection);
const radiusScale = d3.scaleSqrt();
const radiusValue = (d) => Number(d.TOTAL_Sales);

d3.json(
  "https://raw.githubusercontent.com/techslides/D3-Maps/master/data/world/country/Bangladesh.topo.json"
).then((mapData) => {
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

    const formatedData1 = [
      {
        position: [
          projection([Number(90.42272949)], Number(23.78141022))[0],
          projection([Number(90.42272949), Number(23.78141022)])[1],
        ],
        TOTAL_Sales: 1.534269173,
        title: "dummy title",
      },
    ];

    const formatedData2 = [
      {
        position: [
          projection([Number(90.42272949)], Number(23.78141022))[0],
          projection([Number(90.42272949), Number(23.78141022)])[1],
        ],
        TOTAL_Sales: 2.534269173,
        title: "dummy title",
      },
    ];

    const formatedData3 = [
      {
        position: [
          projection([Number(90.42272949)], Number(23.78141022))[0],
          projection([Number(90.42272949), Number(23.78141022)])[1],
        ],
        TOTAL_Sales: 3.534269173,
        title: "dummy title",
      },
    ];

    const formatedData4 = [
      {
        position: [
          projection([Number(90.42272949)], Number(23.78141022))[0],
          projection([Number(90.42272949), Number(23.78141022)])[1],
        ],
        TOTAL_Sales: 4.534269173,
        title: "dummy title",
      },
    ];

    const formatedData5 = [
      {
        position: [
          projection([Number(90.42272949)], Number(23.78141022))[0],
          projection([Number(90.42272949), Number(23.78141022)])[1],
        ],
        TOTAL_Sales: 5.534269173,
        title: "dummy title",
      },
    ];

    svg
      .append("g")
      .attr("class", "total-point1")
      .selectAll("path")
      .data(formatedData1)
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) =>
        spike(
          d3.scaleLinear(
            [0, d3.max(formatedData1, (d) => d.TOTAL_Sales)],
            [0, 180]
          )(d.TOTAL_Sales)
        )
      )
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.TOTAL_Sales)}`
      );

    svg
      .append("g")
      .attr("class", "total-point2")
      .selectAll("path")
      .data(formatedData2)
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) =>
        spike(
          d3.scaleLinear(
            [0, d3.max(formatedData2, (d) => d.TOTAL_Sales)],
            [0, 150]
          )(d.TOTAL_Sales)
        )
      )
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.TOTAL_Sales)}`
      );

    svg
      .append("g")
      .attr("class", "total-point3")
      .selectAll("path")
      .data(formatedData3)
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) =>
        spike(
          d3.scaleLinear(
            [0, d3.max(formatedData3, (d) => d.TOTAL_Sales)],
            [0, 120]
          )(d.TOTAL_Sales)
        )
      )
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.TOTAL_Sales)}`
      );

    svg
      .append("g")
      .attr("class", "total-point4")
      .selectAll("path")
      .data(formatedData4)
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) =>
        spike(
          d3.scaleLinear(
            [0, d3.max(formatedData4, (d) => d.TOTAL_Sales)],
            [0, 90]
          )(d.TOTAL_Sales)
        )
      )
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.TOTAL_Sales)}`
      );

    svg
      .append("g")
      .attr("class", "total-point5")
      .selectAll("path")
      .data(formatedData5)
      .join("path")
      .attr("transform", (d) => `translate(${d.position})`)
      .attr("d", (d) =>
        spike(
          d3.scaleLinear(
            [0, d3.max(formatedData5, (d) => d.TOTAL_Sales)],
            [0, 60]
          )(d.TOTAL_Sales)
        )
      )
      .append("title")
      .text(
        (d) => `${d.title}
  ${d3.format(",.0f")(d.TOTAL_Sales)}`
      );

    let zoom = d3.zoom().on("zoom", handleZoom);

    function handleZoom(e) {
      d3.selectAll("svg g").attr("transform", e.transform);
    }

    function initZoom() {
      d3.selectAll("svg").call(zoom);
    }

    initZoom();

    //     svg
    //     .append("g")
    //     .attr("class", "consumer-footfall")
    //     .selectAll("path")
    //     .data(formatedData.filter((d) => d.position).sort((a, b) => d3.ascending(a.position[1], b.position[1]) || d3.ascending(a.position[0], b.position[0])))
    //     .join("path")
    //     .attr("transform", (d) => `translate(${d.position})`)
    //     .attr("d", (d) => spike(d3.scaleLinear([0, d3.max(formatedData, (d) => d.Consumer_Footfall)], [0, 50])(d.Consumer_Footfall)))
    //     .append("title")
    //     .text(
    //       (d) => `${d.title}
    // ${d3.format(",.0f")(d.Consumer_Footfall)}`
    //     );
  });
});
