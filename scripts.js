$('.fav-button').hide();

var numSwatches = 0;
var hex;

$(window).resize(function(){
    refreshOverflower();
});

window.onbeforeunload = function() {
	return "Your color hystory will be lost!";
};

function deleteSwatch(s) {
	numSwatches--;
	$('#'+s.parentNode.id).hide("fast", function(){s.parentNode.remove(); refreshOverflower();});
}

function inputChange(value) {
	if (value!="") {
		$('.fav-button').show(300);
		setBGTo(value);
	}
	else {
		$('.fav-button').hide(300);
	}
}

function onPickerChange(picker){
	hex = picker.toHEXString();
	setBGTo(hex);
}

function setBGTo(input) {
	document.getElementsByTagName("body")[0].style.backgroundColor = input;
}

function onHeartClick() {
	numSwatches++;
	refreshOverflower();
	$('.overflower').prepend("<div id='swatch-"+numSwatches+"' class='swatch' style='display:none;background-color:"+hex+"'><div>"+hex+"</div><div onclick='deleteSwatch(this)' class='closer'>X</div></div>");
	$('#swatch-'+numSwatches).delay(100).show(400);
	if (!$('.swatches').hasClass("swatches-expanded")){
		toggleSwatches();
	}
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
	$('.overflower').width(($(window).width() > 95*numSwatches ? $(window).width() : 95*numSwatches));
}