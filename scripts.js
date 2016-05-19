$('.fav-button').hide();

var numSwatches = 0;

$(window).resize(function(){
    refreshOverflower();
});

window.onbeforeunload = function() {
	return "Your color hystory will be lost!";
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
	$('.overflower').prepend("<div class='swatch' style='background-color:"+$('body')[0].style.backgroundColor+"'><span>"+$('body')[0].style.backgroundColor+"</span></div>");
	numSwatches++;
	refreshOverflower();
}

function onClearClick() {
	if (confirm("Are you sure you want to clear your history?")) {
		$('.swatches .overflower')[0].innerHTML = "";
	}
}

function toggleSwatches() {
	$('.swatches').toggleClass("swatches-expanded");
}

function onScrollRight() {
	$('.swatches').animate({scrollLeft: $('.swatches').scrollLeft()+500}, 300);
}
function onScrollLeft() {
	$('.swatches').animate({scrollLeft: $('.swatches').scrollLeft()-500}, 300);
}

function refreshOverflower() {
	$('.overflower').width(($(window).width() > 100*numSwatches ? $(window).width() : 100*numSwatches));
}