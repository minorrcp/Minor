var websiteA = { totaalBezoekers: 559573, totaalConversies: 20657, bezoekers: [50832, 25242, 483499], conversies: [130, 1286, 19241] },
	websiteB = { totaalBezoekers: 567730, totaalConversies: 25281, bezoekers: [51599, 36304, 479827], conversies: [399, 2214, 22668] },
	data = websiteA,
	conversieRatio = Math.round(100 * data.totaalConversies / data.totaalBezoekers * 10);

var width = 300,
	height = 300,
	innerRadius = 90,
	outerRadius = 150,
	duration = 750,
	color = d3.scale.category10(),
	donut = d3.layout.pie().sort(null),
	arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius),
	arc2 = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

function numberFormat(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function numberFormat2(x)
{
    return x.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ".");
}

function refreshConversieRatio()
{
	tempRatio = Math.round(100 * data.totaalConversies / data.totaalBezoekers * 10);
	if(tempRatio < conversieRatio)
	{
		conversieRatio = Math.round((conversieRatio - 1));
		$(".resultaat span").html(numberFormat2(conversieRatio) + "%");
		window.setTimeout(function(){
			refreshConversieRatio()
		}, 100);
	}
	if(tempRatio > conversieRatio)
	{
		conversieRatio = Math.round((conversieRatio + 1));
		$(".resultaat span").html(numberFormat2(conversieRatio) + "%");
		window.setTimeout(function(){
			refreshConversieRatio()
		}, 100);
	}
}

// Eerste donut
var svg = d3.select("#image").append("svg:svg")
	.attr("width", width).attr("height", height);
	//.attr("transform", "translate(10,0)");

var arc_grp = svg.append("svg:g")
	.attr("class", "arcGrp")
	.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

var label_group = svg.append("svg:g")
    .attr("class", "lblGroup")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

var center_group = svg.append("svg:g")
    .attr("class", "ctrGroup")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
	
var pieLabel = center_group.append("svg:text")
    .attr("dy", ".35em").attr("class", "chartLabel")
    .attr("text-anchor", "middle")
	.attr("id", "textBezoekersTotaal")
    .html(numberFormat(data.totaalBezoekers));

var arcs = arc_grp.selectAll("path")
	.data(donut(data.bezoekers));
arcs.enter().append("svg:path")
	.attr("stroke", "white")
	.attr("stroke-width", 2)
	.attr("fill", function(d, i) {return color(i);})
	.attr("d", arc)
	.each(function(d) {this._current = d});
	
var sliceLabel = label_group.selectAll("text")
    .data(donut(data.bezoekers));
sliceLabel.enter().append("svg:text")
    .attr("class", "arcLabel")
    .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .text(function(d, i) {return numberFormat(data.bezoekers[i]); });

// Tweede donut
var svg2 = d3.select("#image2").append("svg:svg")
	.attr("width", width).attr("height", height);
	//.attr("transform", "translate(10,0)");

var arc_grp2 = svg2.append("svg:g")
	.attr("class", "arcGrp")
	.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
	
var label_group2 = svg2.append("svg:g")
    .attr("class", "lblGroup")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

var center_group2 = svg2.append("svg:g")
    .attr("class", "ctrGroup")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
	
var pieLabel2 = center_group2.append("svg:text")
    .attr("dy", ".35em").attr("class", "chartLabel")
    .attr("text-anchor", "middle")
	.attr("id", "textConversiesTotaal")
    .html(numberFormat(data.totaalConversies));

var arcs2 = arc_grp2.selectAll("path")
	.data(donut(data.conversies));
arcs2.enter().append("svg:path")
	.attr("stroke", "white")
	.attr("stroke-width", 2)
	.attr("fill", function(d, i) {return color(i);})
	.attr("d", arc2)
	.each(function(d) {this._current = d});

var sliceLabel2 = label_group2.selectAll("text")
    .data(donut(data.conversies));
sliceLabel2.enter().append("svg:text")
    .attr("class", "arcLabel")
    .attr("transform", function(d) {return "translate(" + arc2.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .text(function(d, i) {return numberFormat(data.conversies[i]); });

// Conversieratio
$(".resultaat span").html(numberFormat2(conversieRatio) + "%");

// Functies
function arcTween(a)
{
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}

function updateChart(model)
{
	data = eval(model);
	
	// Donuts animeren
	arcs.data(donut(data.bezoekers));
	arcs.transition().ease("elastic").duration(duration).attrTween("d", arcTween);
	arcs2.data(donut(data.conversies));
	arcs2.transition().ease("elastic").duration(duration).attrTween("d", arcTween);
	
	// Labels animeren
	sliceLabel.data(donut(data.bezoekers));
    sliceLabel.transition().ease("elastic").duration(duration)
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
        .style("fill-opacity", function(d) {return d.value==0 ? 1e-6 : 1;});
	sliceLabel2.data(donut(data.conversies));
    sliceLabel2.transition().ease("elastic").duration(duration)
        .attr("transform", function(d) {return "translate(" + arc2.centroid(d) + ")"; })
        .style("fill-opacity", function(d) {return d.value==0 ? 1e-6 : 1;});

	// Teksten refreshen
	$("#textBezoekersTotaal").fadeOut(100, function()
	{
		$("#textBezoekersTotaal").html(numberFormat(data.totaalBezoekers)).fadeIn('slow');
	});
	$("#textConversiesTotaal").fadeOut(100, function()
	{
		$("#textConversiesTotaal").html(numberFormat(data.totaalConversies)).fadeIn('slow');
	});
	
	// Labels refreshen
	$("#image .arcLabel:nth-child(1)").html(numberFormat(data.bezoekers[0]));
	$("#image .arcLabel:nth-child(2)").html(numberFormat(data.bezoekers[1]));
	$("#image .arcLabel:nth-child(3)").html(numberFormat(data.bezoekers[2]));
	$("#image2 .arcLabel:nth-child(1)").html(numberFormat(data.conversies[0]));
	$("#image2 .arcLabel:nth-child(2)").html(numberFormat(data.conversies[1]));
	$("#image2 .arcLabel:nth-child(3)").html(numberFormat(data.conversies[2]));
	
	// Conversieratio refreshen
	refreshConversieRatio();
}

$("#leftButton").click(function(){
	updateChart('websiteA');
	$("#leftButton").attr("class", "active");
	$("#rightButton").attr("class", "");
});

$("#rightButton").click(function(){
	updateChart('websiteB');
	$("#leftButton").attr("class", "");
	$("#rightButton").attr("class", "active");
});