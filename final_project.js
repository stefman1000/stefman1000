const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 710,
  width = 1075;

let svg = d3.select("#chart1")
  .append("svg")
  .attr("id", "Map")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.json("chicago_crime.json"),
  d3.json("chicago.json")
]).then(([data, chicagoTopology]) => {

  const radius = d3.scaleLinear()
    .domain([0, 13000])
    .range([0, 25]);
  console.log(data)

  const communities = topojson.feature(chicagoTopology, chicagoTopology.objects.chicago);
  console.log(communities)
  const mesh = topojson.mesh(chicagoTopology, chicagoTopology.objects.chicago);
  const projection = d3.geoMercator()
    .fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  svg.append("g")
    .selectAll("path")
    .data(communities.features)
    .join("path")
    .attr("stroke", '#ccc')
    .attr("fill", "#efefef")
    .attr("d", path)

   function updateChart(year) {

  svg.selectAll("circle").remove()
  svg.append("g")
    .selectAll("circle")
    .data(communities.features)
    .join("circle")
    .attr("stroke", '#ccc')
    .attr("fill", "brown")
    .attr("opacity", 0.75)
    //console.log(`${communities.features.properties.area_numbe}`)
    //console.log(data[year].get(communities.features.properties.area_numbe).crimes)
    .attr("r", d => radius(data[year][d.properties.area_numbe].crimes  ))
    //console.log(data[year]) 

    //console.log(`${communities.features.properties.area_numbe}`)
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .on("mousemove", function (event, d) {
      let community = d.properties.community;
      let stats = data[year][d.properties.area_numbe].crimes;
      console.log(community);
    

      tooltip
        .style("visibility", "visible")
        .html(`${community}<br>Crime Count: ${stats}`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", 'brown');
    });

  }

   updateChart(2021);
  
   d3.select("select")
     .on("change", function (event) {
       const i = parseInt(event.target.value);
       updateChart(i);
     });
});