const URL = "https://hexschool.github.io/tw_revenue/tw_revenue.json";

const fetchTopoJson = async () => {
  const geoJson = await fetch("./topo_json.json");
  const data = await geoJson.json();
  return data;
};

const fetchRevenue = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  return data[0].data;
};

const findRevenueIndex = (revenue, cityName) => {
  return revenue.findIndex((item) => item.city === cityName);
};

const draw = (topo, revenue) => {
  let topoData = topojson.feature(topo, topo.objects.COUNTY_MOI_1090820);
  const map = d3.select("#svg");

  // 定位&縮放
  const projection = d3.geoMercator().center([121, 25]).scale(7000);

  const filterMoney = revenue.map((item) =>
    parseInt(item.revenue.split(",").join(""))
  );

  // 上色方法
  const setColor = d3
    .scaleLinear()
    .domain([d3.min(filterMoney), d3.max(filterMoney)])
    .range(["#bcafb0", "#ec595c"]);

  map
    .selectAll("path")
    .data(topoData.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath(projection))
    .attr("stroke", "#3f2ab2")
    .attr("stroke-width", "0.7")
    .attr("fill", (d) => {
      // 區塊上色
      let color = "#d6d6d6";
      const city = d.properties.COUNTYNAME;
      const index = findRevenueIndex(revenue, city);

      if (index !== -1)
        color = setColor(revenue[index].revenue.split(",").join(""));

      return color;
    })
    .on("mouseover", (event, d) => {
      const city = d.properties.COUNTYNAME;
      const index = findRevenueIndex(revenue, city);
      let money = 0;
      if (index !== -1) money = revenue[index].revenue.split(",").join("");

      d3.select(".map-des h1").text(city).style("opacity", "1");
      d3.select(".map-des h2").text(`${money} 元`).style("opacity", "1");
    })
    .on("mouseleave", () => {
      d3.select(".map-des h1").style("opacity", "0")
      d3.select(".map-des h2").style("opacity", "0")
    });
};

const init = async () => {
  try {
    const topo = await fetchTopoJson();
    const revenue = await fetchRevenue();
    draw(topo, revenue);
  } catch (err) {
    console.log(err);
  }
};

init();
