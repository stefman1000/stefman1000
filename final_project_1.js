const svg2 = d3.select("#chart2")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);
margin = ({ top: 15, right: 250, bottom: 35, left: 40 });

d3.csv("migration_clean.csv").then(data => {
  let timeParse = d3.timeParse("%Y");


  const height = 600,
  width = 850,
  margin = ({top: 25, right: 30, bottom: 35, left: 50});

  for (let d of data) {
    d.Year = timeParse(d.Year);
    d.med_house_change = +d.med_house_change;
    d.mig_pct = +d.mig_pct
    d.crime_rate = +d.crime_rate
    
  }

  
  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Year))
    .range([margin.left, width - margin.right]);


  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.med_house_change))
    .range([height - margin.bottom, margin.top]);

    var z = d3.scaleOrdinal(d3.schemeCategory10);

  svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg2.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + "%"));

  let datasets = [data.mig_pct, data.med_house_change,data.crime_rate ]
  

  let line = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d.mig_pct));

    let line2 = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d.med_house_change));

    let line3 = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d.crime_rate));

 
  
    let g = svg2.append("g")
      .attr("class", "data")
      .on('mouseover', function () {
        d3.select(this).classed("highlight", true);
      });
    

    // if (dataset === mig_pct) {
    //   g.classed("highlight", true);
    // }

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("d", line)

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("d", line2)
    console.log(data)

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#800080	")
      .attr("d", line3)

    let lastEntry = data[data.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text('percent net migration flow')
      .attr("x", x(lastEntry.Year) + 3)
      .attr("y", y(lastEntry.mig_pct))
      .attr("dominant-baseline", "middle")
      .attr("fill", "green");

     lastEntry = data[data.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text('median house price change')
      .attr("x", x(lastEntry.Year) + 3)
      .attr("y", y(lastEntry.med_house_change))
      .attr("dominant-baseline", "middle")
      .attr("fill", "red");



    lastEntry = data[data.length - 1]; //last piece of data to position text x and y


    g.append("text")
      .text('crime rate')
      .attr("x", x(lastEntry.Year) + 3)
      .attr("y", y(lastEntry.crime_rate))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#800080");



      
  
  
});