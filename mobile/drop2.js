document.addEventListener("animationend", dispatchEvent, false);

// check the animation name and change header style accordingly

function dispatchEvent(event) {

  if (event.animationName === 'min-width-800px') {
    restore();
  }
  else {
  	removeDropDown();
  }

}

function createDropDown() {

	x = document.getElementById('nav-item2');
	v = document.getElementById('nav-item1');

  	var color = '#F5F5F8';
    var fontSize = '30px';
  	var fontFamily = '"Trebuchet MS", Courier, Impact';
  	var padding = '30px';
  	var display = 'block';

  	if (x.style.display == 'block') {
  		removeDropDown();
  	}
  	else {

  		x.style.display = display;
		x.style.fontSize = fontSize;
		x.style.fontFamily = fontFamily;
		x.style.color = color;
		x.style.padding = padding;

  	}

}

function removeDropDown() {

	burger = document.getElementById('collapse');

	styleOfBurger = getDisplayStyle(burger);

	if (styleOfBurger == 'none') {
		//do nothing, as there is no Dropdown
	}
	else {

		x = document.getElementById('nav-item2');
		v = document.getElementById('nav-item1');

		x.style.display = 'none';
		v.style.marginLeft = '112px';

	}

}

function restore() {

	x = document.getElementById('nav-item2');

	x.style.display = 'table-cell';

}

function getDisplayStyle(element) {

	return element.currentStyle ? element.currentStyle.display :
		getComputedStyle(element, null).display;

}
