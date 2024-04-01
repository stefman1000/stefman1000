
  
d3.selectAll("select")
  .on("change", function (event) {
    const i = parseInt(event.target.value);
    updateChart(i);
  });

const radius = d3.scaleLinear()
    .domain([0, 5000])
    .range([0, 25]);
  

  updateChart(2007)
   function updateChart(year) {


d3.json("chicago_crime_dscpt.json").then((data) => {
        const height = 500,
          width = 600,
          innerRadius = 100,
          outerRadius = 175,
          labelRadius = 200; 
        
      
        var arcs = d3.pie().value(d => d.Amount)(data[year]);
        var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        var arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
        console.log(arcs);
        d3.select("#Ring123").remove(); 
        const svg4 = d3.select("#chart4")
          .append("svg")
          .attr("id","Ring123")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      
        svg4.append("g")     // makes white seperators between arcs
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .selectAll("path")        // begin data join, put data into buckets
          .data(arcs)
          .join("path")
          .attr("fill", (d, i) => d3.schemeCategory10[i])
          .attr("d", arc);
      
        svg4.append("g")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(arcs)
          .join("text")
          .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
          .selectAll("tspan")     // creates a break in the line
          .data(d => {
            return [d.data.Category, d.data.Amount];
          })
          .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i) => `${i * 1.1}em`)
          .attr("font-weight", (d, i) => i ? null : "bold")
          .text(d => d);
      
        svg4.append("text")
          .attr("font-size", 30)
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .text(year)
          .style("font-size", 20);


          
      });
  }

  
  d3.selectAll("select")
     .on("change", function (event) {
       const i = parseInt(event.target.value);
       updateChart(i);
     });
