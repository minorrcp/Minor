var dataLeft = [63, 36, 31, 9, 0, 9],
	dataRight = [134, 88, 31, 4, 2, 20],
	data = dataLeft,
	width = 500,
	height = 450,
	innerRadius = 125,
	outerRadius = 200,
	duration = 750,
	color = d3.scale.category10(),
	donut = d3.layout.pie().sort(null),
	arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

var svg = d3.select("#image").append("svg:svg")
	.attr("width", width).attr("height", height);

var arc_grp = svg.append("svg:g")
	.attr("class", "arcGrp")
	.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

var arcs = arc_grp.selectAll("path")
	.data(donut(data));
arcs.enter().append("svg:path")
	.attr("stroke", "white")
	.attr("stroke-width", 4)
	.attr("fill", function(d, i) {return color(i);})
	.attr("d", arc)
	.each(function(d) {this._current = d});

function arcTween(a)
{
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}

function updateChart(model) {
	data = eval(model);
	arcs.data(donut(data));
	arcs.transition().ease("elastic").duration(duration).attrTween("d", arcTween);
}

$("#leftButton").click(function(){
	updateChart('dataLeft');
	$("#leftButton").attr("class", "active");
	$("#rightButton").attr("class", "");
});

$("#rightButton").click(function(){
	updateChart('dataRight');
	$("#leftButton").attr("class", "");
	$("#rightButton").attr("class", "active");
});