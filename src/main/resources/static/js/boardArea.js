// http://www.softicons.com/toolbar-icons/vista-arrow-icons-by-icons-land/up-blue-icon

function setAsBoardArea(divId) {

	var divBack = document.getElementById(divId);

	if (divBack) {
		divBack.innerHTML = "";

		divBack.classList.add("boardArea_back");

		var divLeftArrowBack = document.createElement("div");
		divLeftArrowBack.classList.add("leftArrowBack");
		divBack.appendChild(divLeftArrowBack);

		var imgLeftArrow = document.createElement("img");
		imgLeftArrow.id = "imgLeftArrow";
		imgLeftArrow.src = "img/" + encodeURI("blue_arrow_left.png");
		imgLeftArrow.classList.add("imgLeftArrow");
		imgLeftArrow.style.display = "none";
		imgLeftArrow.addEventListener("mousedown", scrollToLeft);
		imgLeftArrow.addEventListener("mouseup", stopScrolling);
		divLeftArrowBack.appendChild(imgLeftArrow);

		var divBackCards = document.createElement("div");
		divBackCards.classList.add("boardArea_backCards");
		divBack.appendChild(divBackCards);
		
		var divScrollCards = document.createElement("div");
		divScrollCards.id = "divScrollCards";
		divScrollCards.classList.add("boardArea_scrollCards");
		divBackCards.appendChild(divScrollCards);

		var divCardsContainer = document.createElement("div");
		divCardsContainer.classList.add("boardArea_cardsContainer");
		divScrollCards.appendChild(divCardsContainer);
		
		var divRightArrowBack = document.createElement("div");
		divRightArrowBack.classList.add("rightArrowBack");
		divBack.appendChild(divRightArrowBack);
		
		var imgRightArrow = document.createElement("img");
		imgRightArrow.id = "imgRightArrow";
		imgRightArrow.src = "img/" + encodeURI("blue_arrow_right.png");
		imgRightArrow.classList.add("imgRightArrow");
		imgRightArrow.addEventListener("mousedown", scrollToRight);
		imgRightArrow.addEventListener("mouseup", stopScrolling);
		divRightArrowBack.appendChild(imgRightArrow);
	}

	return divCardsContainer;
}

var scrollingTaskId;

function scrollToLeft() {
	clearInterval(scrollingTaskId);
	scrollingTaskId = setInterval(function(){ startScroll(-100); }, 40);
}

function scrollToRight() {
	clearInterval(scrollingTaskId);
	scrollingTaskId = setInterval(function(){ startScroll(100); }, 40);
}

function startScroll(offset) {

	var div = document.getElementById("divScrollCards");
	var max = div.scrollWidth - div.clientWidth;
	var x = div.scrollLeft;
	
	if (offset > 0) {
		x = (x > (max - offset)) ? max : x + offset;
		div.scrollLeft = x;

	} else {
		x = (x < (-offset)) ? 0 : x + offset;
		div.scrollLeft = x;
	}
	
	if (x == 0) {
		clearInterval(scrollingTaskId);
		document.getElementById("imgLeftArrow").style.display = "none";
	} else {
		document.getElementById("imgLeftArrow").style.display = "block";
	}
	
	if (x == max) {
		clearInterval(scrollingTaskId);
		document.getElementById("imgRightArrow").style.display = "none";
	} else {
		document.getElementById("imgRightArrow").style.display = "block";
	}
	
}

function stopScrolling() {
	clearInterval(scrollingTaskId);
}