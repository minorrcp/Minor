document.onmousemove = setValues;

var width = 600;
var height = 480;
var cursorX = 0;
var cursorY = 0;

var projection = d3.geo.azimuthalEquidistant()
	.translate([104,948])
	.scale([750]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select(".image")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

d3.json("data.json", function(json) {
	svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("data-id", function(d) { return d.properties.name; })
		.style("fill", "#b5d592");
});

function setValues(e)
{
    cursorX = e.pageX;
    cursorY = e.pageY;
	$(".label").css("left", (cursorX + 10) + "px");
	$(".label").css("top", (cursorY + 8) + "px");
}

$(function() {
	$("svg path").hover(function()
	{
		$(this).attr("style", "fill: rgb(0, 213, 146);");
		$(".label").html($(this).attr("data-id"));
		$(".label").show();
	},
	function()
	{
		$(this).attr("style", "fill: rgb(181, 213, 146);");
		$(".label").hide();
	});
});