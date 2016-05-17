$('.fav-button').hide();

var numSwatches = 0;

$(window).resize(function(){
    refreshOverflower();
});

window.onbeforeunload = function() {
	return "Your color hystory will be lost.";
};
function colorChange(value) {
	if (value!="") {
		$('.fav-button').show(300);
		if (/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(value)) {
			setBGTo("#"+value);
		}
		else {
			setBGTo(value);
		}
	}
	else {
		$('.fav-button').hide(300);
	}
}

function setBGTo(input) {
	document.getElementsByTagName("body")[0].style.backgroundColor = input;
}

function onHeartClick() {
	console.log($('body')[0].style.backgroundColor);
	$('.overflower').prepend("<div class='swatch' style='background-color:"+$('body')[0].style.backgroundColor+"'></div>");
	numSwatches++;
	refreshOverflower();
}

function refreshOverflower() {
	$('.overflower').width(($(window).width() > 100*numSwatches ? $(window).width() : 100*numSwatches));
}