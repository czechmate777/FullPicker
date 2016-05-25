$('.fav-button').hide();

var numSwatches = 0;
var swatchId = 0;
var hex;

$(document).ready(function() {
	loadSwatchesFromHash();
});

$(window).resize(function(){
    refreshOverflower();
});

function deleteSwatch(s) {
	event.stopPropagation();
	numSwatches--;
	if (numSwatches < 1) {
		$('.swatches .overflower').html("");
		updateAddress();
	}
	else {
		$('#'+s.parentNode.id).hide("fast", function(){s.parentNode.remove(); refreshOverflower(); updateAddress()});
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
		updateAddress();
	}
	else {
		$('.fav-button').hide(300);
	}
}

function onPickerChange(picker){
	hex = picker.toHEXString();
	setBGTo(hex);
	updateAddress();
}

function setBGTo(input) {
	document.getElementsByTagName("body")[0].style.backgroundColor = input;
}

function onHeartClick() {
	addSwatch(hex);
}

function addSwatch(color) {
	numSwatches++;
	swatchId++;
	refreshOverflower();
	$('.overflower').prepend("<div id='swatch-"+swatchId+"' class='swatch' onclick='selectSwatch(this)' style='display:none;background-color:"+color+"'><div>"+color+"</div><div onclick='deleteSwatch(this)' class='closer'>X</div></div>");
	$('#swatch-'+swatchId).delay(100).show(400);
	if (!$('.swatches').hasClass("swatches-expanded")){
		toggleSwatches();
	}
	updateAddress();
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

function getSwatchList() {
	swatchList = [];
	var swatches = $('.swatches .overflower').children();
	for (var i = 0; i < numSwatches; i++) {
		swatchList[i] = swatches[i].firstChild.innerHTML;
	}
	return swatchList;
}

function updateAddress() {
	if (numSwatches > 0) {
		var address = "?id="+swatchId+"&";
		var swatchList = getSwatchList();
		for (var i = 0; i < swatchList.length; i++) {
			address += swatchList[i];
		}
		window.history.replaceState("", "FullPicker", window.location.pathname+address);
	}
	else {
		window.history.replaceState("", "FullPicker", window.location.pathname);
	}
}

function loadSwatchesFromHash() {
	var hash = window.location.hash.substring(1).split('#');
	console.log(hash);
	if (hash[0]!="") {
		for (var i = hash.length-1; i >=0; i--) {
			addSwatch("#"+hash[i]);
		}
	}
}