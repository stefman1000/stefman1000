function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
         color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


d3.csv("fox_data.csv").then(data => {
    
    

    for (let d of data) {
        d.Amount = +d.Amount/d.Pop;
    };

    const height = 400,
        width = 800,
        margin = ({top: 25, right: 30, bottom: 35, left: 50});
    
    

    let svg5 = d3.select("#chart3")
        .append("svg")
        .attr("viewBox", [0,0, width, height ]);

    let x = d3.scaleBand()
        .domain(data.map(d => d.City))          // returns an array
        .range([margin.left, width - margin.right])
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0,d3.max(data, d => d.Amount)]).nice()
        .range([height - margin.bottom, margin.top]);  

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom+ 5})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left -5}, 0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0));


    svg5.append("g")
        .call(xAxis);

    svg5.append("g")
        .call(yAxis);

    let bar = svg5.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");  

    bar.append("rect")
        .attr("fill", function (d) { return getRandomColor(); })
        // .attr("fill", 'steelblue')
        .attr("x", d => x(d.City))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.Amount))
        .attr("height", d => y(0)-y(d.Amount));

    
});

