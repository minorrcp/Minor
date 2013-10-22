var margin = {top: 30, right: 24, bottom: 40, left: 50},
	width = 800 - margin.left - margin.right,
	height = 450 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

// Assen definiëren
var	xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(25);
var yAxisLeft = d3.svg.axis().scale(y0).orient("left").ticks(10);
var yAxisRight = d3.svg.axis().scale(y1).orient("right").ticks(10);

// Twee lijnen definiëren
var valueline = d3.svg.line()
	.interpolate("monotone")
	.x(function(d) { return x(d.Weeknummer); })
	.y(function(d) { return y0(d.Conversies); });
var valueline2 = d3.svg.line()
	.interpolate("monotone")
	.x(function(d) { return x(d.Weeknummer); })
	.y(function(d) { return y1(d.ConversieRatio); });

// HTML element kiezen en stylen
var	svg = d3.select("#image")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Data inladen en verwerken
d3.csv("data.csv", function(error, data) {
	data.forEach(function(d) {
		d.Weeknummer = d.Weeknummer;
		d.Conversies = +d.Conversies;
		d.ConversieRatio = +d.ConversieRatio;
	});

	// Het bereik van de gegevens
	x.domain([1,26]);
	y0.domain([7000,15000]); 
	y1.domain([0, 20]); 
	
	// Horizontale lijn maken (Target)
	svg.append("line")
	.attr("x1", 0)
	.attr("y1", 190)
	.attr("x2", width)
	.attr("y2", 190)
	.attr("stroke-width", 1.5)
	.attr("stroke", "#419f13");

	// Conversies grafiek maken
	svg.append("path")
	.attr("class", "line")
	.attr("d", valueline(data));

	// Conversieration grafiek maken
	svg.append("path")
	.attr("class", "line2")
	.attr("d", valueline2(data));
	
	// De X-as maken
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

	// De linker Y-as maken
	svg.append("g")
	.attr("class", "y axis")
	.style("fill", "#2a77b6")
	.call(yAxisLeft)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 7)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-size", "11px")
	.text("Conversies");

	// De rechter Y-as maken
	svg.append("g")             
	.attr("class", "y axis")    
	.attr("transform", "translate(" + width + " ,0)")   
	.style("fill", "#9068c0")       
	.call(yAxisRight)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -14)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-size", "11px")
	.text("Conversieratio");
});