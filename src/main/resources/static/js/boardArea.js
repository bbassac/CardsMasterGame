//http://www.softicons.com/toolbar-icons/vista-arrow-icons-by-icons-land/up-blue-icon
//http://www.authorcode.com/scroll-up-and-down-div-from-input-buttons-in-javascript/?fbclid=IwAR0cENvLPt0aKQaKTrDcMY2vLBHXPxfUemIfwtbBg3pIxogCBxUeNlbmqnc

function setAsBoardArea(divId) {

	var divBack = document.getElementById(divId);

	if (divBack) {
		var id = divBack.id + "_";
		var elements = {};
		
		divBack.innerHTML = "";

		divBack.classList.add("boardArea_back");

		var divLeftArrowBack = document.createElement("div");
		divLeftArrowBack.classList.add("leftArrowBack");
		divBack.appendChild(divLeftArrowBack);

		var imgLeftArrow = document.createElement("img");
		imgLeftArrow.src = "img/" + encodeURI("blue_arrow_left.png");
		imgLeftArrow.classList.add("imgLeftArrow");
		imgLeftArrow.style.display = "none";
		imgLeftArrow.addEventListener("mousedown", scrollToLeft);
		imgLeftArrow.addEventListener("mouseup", stopScrolling);
		imgLeftArrow.scrollElements = elements;
		divLeftArrowBack.appendChild(imgLeftArrow);

		var divBackCards = document.createElement("div");
		divBackCards.classList.add("boardArea_backCards");
		divBack.appendChild(divBackCards);
		
		var divScrollCards = document.createElement("div");
		divScrollCards.classList.add("boardArea_scrollCards");
		divBackCards.appendChild(divScrollCards);

		var divCardsContainer = document.createElement("div");
		divCardsContainer.classList.add("boardArea_cardsContainer");
		divScrollCards.appendChild(divCardsContainer);
		
		var divRightArrowBack = document.createElement("div");
		divRightArrowBack.classList.add("rightArrowBack");
		divBack.appendChild(divRightArrowBack);
		
		var imgRightArrow = document.createElement("img");
		imgRightArrow.src = "img/" + encodeURI("blue_arrow_right.png");
		imgRightArrow.classList.add("imgRightArrow");
		imgRightArrow.addEventListener("mousedown", scrollToRight);
		imgRightArrow.addEventListener("mouseup", stopScrolling);
		imgRightArrow.scrollElements = elements;
		divRightArrowBack.appendChild(imgRightArrow);
		
		elements.imgLeftArrow = imgLeftArrow;
		elements.divScrollCards = divScrollCards;
		elements.imgRightArrow = imgRightArrow;
	}

	return divCardsContainer;
}

var scrollingTaskId;

function scrollToLeft(event) {
console.log(event.target.scrollElements);	

	stopScrolling();
	
	var elements = event.target.scrollElements;
	var div = elements.divScrollCards;
	elements.scrollMax = div.scrollWidth - div.clientWidth;
	
	console.log("start scrolling left");
	scrollingTaskId = setInterval(function(){ doScroll(-100, elements); }, 40);
}

function scrollToRight(event) {

	stopScrolling();

	var elements = event.target.scrollElements;
	var div = elements.divScrollCards;
	elements.scrollMax = div.scrollWidth - div.clientWidth;

	console.log("start scrolling right");
	scrollingTaskId = setInterval( function(){ doScroll(100, elements); }, 40);
}

function stopScrolling() {
	console.log("stop scrolling");
	clearInterval(scrollingTaskId);
}

function doScroll(offset, elements) {

	var div = elements.divScrollCards;
	var max = elements.scrollMax;
	var x = div.scrollLeft;
	
	if (offset > 0) {
		x = (x > (max - offset)) ? max : x + offset;
		div.scrollLeft = x;

	} else {
		x = (x < (-offset)) ? 0 : x + offset;
		div.scrollLeft = x;
	}

	console.log("scroll to " + x);
	
	if (x == 0) {
		console.log("stop (" + x + ")");
		stopScrolling();
		elements.imgLeftArrow.style.display = "none";
	} else {
		elements.imgLeftArrow.style.display = "block";
	}
	
	if (x == max) {
		console.log("stop (" + x + ")");
		stopScrolling();
		elements.imgRightArrow.style.display = "none";
	} else {
		elements.imgRightArrow.style.display = "block";
	}
	
}