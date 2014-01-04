function getColor(temperatures, day, type)
{
	// Gemiddelde temperatuur berekenen
	var temp = temperatures.length / 30;
	var day1 = Math.floor(temp * (day*2));
	var day2 = Math.floor(temp * (day*2+1));
	var gemiddeldeTemperatuur = (temperatures[day1] + temperatures[day2]) / 2;
	
	if(type == 'color')
	{
		// Kleur opzoeken
		if(gemiddeldeTemperatuur < -8.75)
		{
			return data.globals.colors[0];
		}
		else if(gemiddeldeTemperatuur < -6.25)
		{
			return data.globals.colors[1];
		}
		else if(gemiddeldeTemperatuur < -3.75)
		{
			return data.globals.colors[2];
		}
		else if(gemiddeldeTemperatuur < -1.25)
		{
			return data.globals.colors[3];
		}
		else if(gemiddeldeTemperatuur < 1.25)
		{
			return data.globals.colors[4];
		}
		else if(gemiddeldeTemperatuur < 3.75)
		{
			return data.globals.colors[5];
		}
		else if(gemiddeldeTemperatuur < 6)
		{
			return data.globals.colors[6];
		}
		else if(gemiddeldeTemperatuur < 8)
		{
			return data.globals.colors[7];
		}
		else if(gemiddeldeTemperatuur < 10)
		{
			return data.globals.colors[8];
		}
		else if(gemiddeldeTemperatuur < 12)
		{
			return data.globals.colors[9];
		}
		else if(gemiddeldeTemperatuur < 14)
		{
			return data.globals.colors[10];
		}
		else if(gemiddeldeTemperatuur < 15.75)
		{
			return data.globals.colors[11];
		}
		else if(gemiddeldeTemperatuur < 17.25)
		{
			return data.globals.colors[12];
		}
		else if(gemiddeldeTemperatuur < 19)
		{
			return data.globals.colors[13];
		}
		else if(gemiddeldeTemperatuur < 21)
		{
			return data.globals.colors[14];
		}
		else if(gemiddeldeTemperatuur < 23)
		{
			return data.globals.colors[15];
		}
		else if(gemiddeldeTemperatuur < 25)
		{
			return data.globals.colors[16];
		}
		else if(gemiddeldeTemperatuur < 27)
		{
			return data.globals.colors[17];
		}
		else if(gemiddeldeTemperatuur < 29)
		{
			return data.globals.colors[18];
		}else{
			return data.globals.colors[19];
		}
	}else{
		return Math.round(gemiddeldeTemperatuur);
	}
}

function updateImage()
{
	$(".image").empty();
	$(".time .year").html(data.months[data.globals.currentMonth].date + ' tot ' + data.months[data.globals.currentMonth + 11].date);
	$(".title").html('Temperatuurskalender ' + (data.months[data.globals.currentMonth].date.substr(3,4) == data.months[data.globals.currentMonth + 11].date.substr(3,4) ? data.months[data.globals.currentMonth].date.substr(3,4) : '\'' + data.months[data.globals.currentMonth].date.substr(5,2) + ' \'' + data.months[data.globals.currentMonth + 11].date.substr(5,2)));
	for(var i = 0; i < data.globals.showNumberOfMonths; i++)
	{
		// data.months[currentMonth + i].date;
		$(".image").append('<div class="row" data-id="' + i + '" data-row="' + data.months[data.globals.currentMonth + i].date + '"></div>');
		for(var j = 0; j < 15; j++)
		{
			$(".image .row[data-row='" + data.months[data.globals.currentMonth + i].date + "']").append('<div class="triangle-' + (j % 2 == 1 ? 'up' : 'down') + '" data-color="' + getColor(data.months[data.globals.currentMonth + i].days, j, 'color') + '" data-temperature="' + getColor(data.months[data.globals.currentMonth + i].days, j, 'data') + '" style="top:' + (j % 2 == 1 ? '0' : '28') + 'px;left:' + (j*22) + 'px;border-' + (j % 2 == 1 ? 'bottom' : 'top') + '-color:#' + getColor(data.months[data.globals.currentMonth + i].days, j, 'color') + '"></div>');
		}
	}
}

$(function(){
	// Legenda maken
	for(var i = (data.globals.colors.length-1); i >= 0; i--)
	{
		$(".legend .colors").append('<div class="color" data-id="' + data.globals.colors[i] + '" style="background-color:#' + data.globals.colors[i] + '"></div>');
	}
	
	// Image maken
	data.globals.currentMonth = data.months.length - data.globals.showNumberOfMonths;
	updateImage();
	
	$('.legend').hover(function(e) {
		$(".image .triangle-up").not("[data-color='" + data.globals.currentColor + "']").animate({opacity: 0.5}, 100);
		$(".image .triangle-down").not("[data-color='" + data.globals.currentColor + "']").animate({opacity: 0.5}, 100);
		
		$('.legend .color').hover(function(e) {
			$(".image .triangle-up").empty();
			$(".image .triangle-down").empty();
			$(".image .triangle-up").css('opacity','0.5');
			$(".image .triangle-down").css('opacity','0.5');
			$(".image .triangle-up").css('opacity','0.5').attr('class', 'triangle-up');
			$(".image .triangle-down").css('opacity','0.5').attr('class', 'triangle-down');
			$(".image .triangle-up[data-color='" + data.globals.currentColor + "']").css('opacity','1');
			$(".image .triangle-down[data-color='" + data.globals.currentColor + "']").css('opacity','1');
			$(".image .triangle-up[data-color='" + data.globals.currentColor + "']").attr('class', 'triangle-up triangle-up-move');
			$(".image .triangle-down[data-color='" + data.globals.currentColor + "']").attr('class', 'triangle-down triangle-down-move');
			$(".image .triangle-up[data-color='" + data.globals.currentColor + "']").each(function() { $(this).append("<div class=\"number-up\">" + $(this).attr("data-temperature") + "</div>") });
			$(".image .triangle-down[data-color='" + data.globals.currentColor + "']").each(function() { $(this).append("<div class=\"number-down\">" + $(this).attr("data-temperature") + "</div>") });
			data.globals.currentColor = $(this).attr('data-id');
		}, function() {
		});
	}, function() {
		$(".image .triangle-up").empty();
		$(".image .triangle-down").empty();
		$(".image .triangle-up").css('opacity','0.5').attr('class', 'triangle-up');
		$(".image .triangle-down").css('opacity','0.5').attr('class', 'triangle-down');
		$(".image .triangle-up").animate({opacity: 1}, 500);
		$(".image .triangle-down").animate({opacity: 1}, 500);
	});
	
	$('.time .button-up').click(function(){
		if((data.globals.currentMonth - 1) >= 0)
		{
			data.globals.currentMonth -= 1;
			updateImage();
		}
	});
	$('.time .button-down').click(function(){
		//alert(data.globals.currentMonth + 1 + '-' + data.months.length);
		if((data.globals.currentMonth + 12) < data.months.length)
		{
			data.globals.currentMonth += 1;
			updateImage();
		}
	});
});

function keyPressed(key) {
	$(function(){
		if(key == 38) // Top
		{
			if((data.globals.currentMonth - 12) >= 0)
			{
				data.globals.currentMonth -= 12;
				updateImage();
			}
		}
		else if(key == 40) // Bottom
		{
			if((data.globals.currentMonth + 24) < data.months.length)
			{
				data.globals.currentMonth += 12;
				updateImage();
			}
		}
	});
}
$(document).keyup(function(e){
	keyPressed(e.keyCode);
});