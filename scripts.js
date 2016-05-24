$('.fav-button').hide();

var numSwatches = 0;
var swatchId = 0;
var hex;

$(window).resize(function(){
    refreshOverflower();
});

window.onbeforeunload = function() {
	return "Your color hystory will be lost!";
};

function deleteSwatch(s) {
	event.stopPropagation();
	numSwatches--;
	if (numSwatches < 1) {
		$('.swatches .overflower').html("");
	}
	else {
		$('#'+s.parentNode.id).hide("fast", function(){s.parentNode.remove(); refreshOverflower();});
	}
}

function selectSwatch(s) {
	var c = s.firstChild.innerHTML;
	setBGTo(c);
	$('.jscolor').val(c);
	$('.jscolor').trigger("change");

	// Select the hex
	var range, selection;    
    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(s.firstChild);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(s.firstChild);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function inputChange(value) {
	console.log("inputChange");
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
	swatchId++;
	refreshOverflower();
	$('.overflower').prepend("<div id='swatch-"+swatchId+"' class='swatch' onclick='selectSwatch(this)' style='display:none;background-color:"+hex+"'><div>"+hex+"</div><div onclick='deleteSwatch(this)' class='closer'>X</div></div>");
	$('#swatch-'+swatchId).delay(100).show(400);
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