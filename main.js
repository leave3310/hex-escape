const URL = 'https://hexschool.github.io/tw_revenue/tw_revenue.json'
const geoJson = './COUNTY_MOI_1090820.json'
let taiwanTopo = []

const drawMap = (mapData) => {
    //
}

const fetchTopo = () => {
    fetch(geoJson)
        .then(res => res.json())
        .then(res => {
            taiwanTopo = res
        })
        .then(mapData => {
            // 定義經緯度位置 & 定義比例尺
            const projection = d3.geoMercator().center([123, 24]).scale(5500)
            const path = d3.geoPath(projection)

            d3.select('g.counties')
                .selectAll("path")
                .data(topojson.feature(mapData, mapData.objects["COUNTY_MOI_1090820"]).features)
                .enter().append("path")
                .attr("d", path);

            d3.select('path.county-borders')
                .attr("d", path(topojson.mesh(mapData, mapData.objects["COUNTY_MOI_1090820"], function (a, b) { return a !== b; })));
        })
        .catch(err => console.log(err))
}
fetchTopo()
drawMap(taiwanTopo)