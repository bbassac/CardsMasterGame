//http://www.softicons.com/toolbar-icons/vista-arrow-icons-by-icons-land/up-blue-icon
//http://www.authorcode.com/scroll-up-and-down-div-from-input-buttons-in-javascript/?fbclid=IwAR0cENvLPt0aKQaKTrDcMY2vLBHXPxfUemIfwtbBg3pIxogCBxUeNlbmqnc

var scrollingTaskId;

function setAsBoardArea(divId,theme) {

	var divBack = document.getElementById(divId);
	var divCardsContainer = null;
	
	if (divBack != null) {
		
		if (divBack.isBoardArea == null) {
			console.log(divId + " transform to boardArea")
			divCardsContainer = transformArea(divBack,theme);
		} else {
			divCardsContainer = divBack.scrollElements.divCardsContainer;
		}
	
	}

	return divCardsContainer;
}

function transformArea(divBack,theme) {
	
	var id = divBack.id + "_";
	var elements = {};
	
	divBack.isBoardArea = true;
	divBack.scrollElements = elements;
	divBack.innerHTML = "";

	divBack.classList.add("boardArea_back");

	var divLeftArrowBack = document.createElement("div");
	divLeftArrowBack.classList.add("leftArrowBack");
	divBack.appendChild(divLeftArrowBack);

	var imgLeftArrow = document.createElement("img");
	imgLeftArrow.src = "img/" + encodeURI(theme+"_arrow_left.png");
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
	divCardsContainer.id = id + "divCardsContainer";
	divCardsContainer.classList.add("boardArea_cardsContainer");
	divCardsContainer.scrollElements = elements;
	divCardsContainer.isBoardArea = true;
	divScrollCards.appendChild(divCardsContainer);
	
	var divRightArrowBack = document.createElement("div");
	divRightArrowBack.classList.add("rightArrowBack");
	divBack.appendChild(divRightArrowBack);
	
	var imgRightArrow = document.createElement("img");
	imgRightArrow.src = "img/" + encodeURI(theme+"_arrow_right.png");
	imgRightArrow.classList.add("imgRightArrow");
	imgRightArrow.style.display = "none";
	imgRightArrow.addEventListener("mousedown", scrollToRight);
	imgRightArrow.addEventListener("mouseup", stopScrolling);
	imgRightArrow.scrollElements = elements;
	divRightArrowBack.appendChild(imgRightArrow);
	
	elements.imgLeftArrow = imgLeftArrow;
	elements.divScrollCards = divScrollCards;
	elements.divCardsContainer = divCardsContainer;
	elements.imgRightArrow = imgRightArrow;
	
	divCardsContainer.updateScrollArrows = updateScrollArrows;
	//divCardsContainer.addEventListener("click", showsizes);

	divCardsContainer.updateArrowsEventTarget = (function(event) { tryUpdateScrollArrows(event, divCardsContainer); });
	divCardsContainer.addEventListener("DOMNodeInserted",  divCardsContainer.updateArrowsEventTarget);
	divCardsContainer.addEventListener("DOMNodeRemoved", divCardsContainer.updateArrowsEventTarget );
	
	return divCardsContainer
}

function cleanArea(divBack) {

	var cardsArea = null;
	
	if (divBack != null) {
		
		if (divBack.isBoardArea == null) {
			divBack.innerHTML = "";
			cardsArea = divBack;
			
		} else {
			var divCardsContainer = divBack.scrollElements.divCardsContainer;
			var updateArrowsEventTarget = divCardsContainer.updateArrowsEventTarget;
			
			divCardsContainer.removeEventListener("DOMNodeInserted", updateArrowsEventTarget );
			divCardsContainer.removeEventListener("DOMNodeRemoved", updateArrowsEventTarget );
			
			while (divCardsContainer.firstChild) {
				divCardsContainer.removeChild(divCardsContainer.lastChild);
			}			
		
			divBack.scrollElements.imgLeftArrow.style.display = "none";
			divBack.scrollElements.imgRightArrow.style.display = "none";
			
			divCardsContainer.cardsLength = 0;	
			
			divCardsContainer.addEventListener("DOMNodeInserted", updateArrowsEventTarget );
			divCardsContainer.addEventListener("DOMNodeRemoved", updateArrowsEventTarget );
		
			cardsArea = divCardsContainer;
		}
		
	}
		
	return cardsArea;
}

function scrollToLeft(event) {
	stopScrolling();
	
	var elements = event.target.scrollElements;
	var div = elements.divScrollCards;
	elements.scrollMax = div.scrollWidth - div.clientWidth;
	
	doScroll(-100, elements);
	scrollingTaskId = setInterval(function(){ doScroll(-100, elements); }, 40);
}

function scrollToRight(event) {
	stopScrolling();

	var elements = event.target.scrollElements;
	var div = elements.divScrollCards;
	elements.scrollMax = div.scrollWidth - div.clientWidth;

	doScroll(100, elements);
	scrollingTaskId = setInterval( function(){ doScroll(100, elements); }, 40);
}

function stopScrolling() {
	
	if (scrollingTaskId != null) {
		clearInterval(scrollingTaskId);
		scrollingTaskId == null;
	}

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

	if (x == 0) {
		stopScrolling();
		elements.imgLeftArrow.style.display = "none";
	} else {
		elements.imgLeftArrow.style.display = "block";
	}
	
	if (x == max) {
		stopScrolling();
		elements.imgRightArrow.style.display = "none";
	} else {
		elements.imgRightArrow.style.display = "block";
	}
	
}

function showsizes(event) {
	
	var cs = document.getElementById("boardPlayer_divCardsContainer").childNodes;
	var s = "";
	for (var i = 0; i < cs.length; i++) {
		s = s + cs[i].offsetWidth + ", ";
	}
	console.log("boardPlayer_divCardsContainer " + s);

	var cs = document.getElementById("hand_divCardsContainer").childNodes;
	var s = "";
	for (var i = 0; i < cs.length; i++) {
		s = s + cs[i].offsetWidth + ", ";
	}
	console.log("hand_divCardsContainer " + s);

}

function getCardAdded(event, divCardsContainer) {
	
	var result = null;
	
	if ((event != null) && (divCardsContainer != null)) {
		
		var addedElement = event.target;
		
		if (addedElement != null) {
			var parentOfAddedElement = addedElement.parentNode;
			
			if ((parentOfAddedElement != null) && (parentOfAddedElement == divCardsContainer)) {
				result = addedElement.domCard; 
			}
		}
	}

	return result;
}

function tryUpdateScrollArrows(event, divCardsContainer) {

	var domCard = getCardAdded(event, divCardsContainer);
	
	if (domCard != null) {
		console.log(divCardsContainer.id + " " + event.type);
		
		domCard.addEventListener("used", function() { testIfDivReadyToUpdateArrows(divCardsContainer, 0); })
		domCard.addEventListener("activated", function() { testIfDivReadyToUpdateArrows(divCardsContainer, 0); })
		
		var offsetCardLength = (event.type == "DOMNodeRemoved" ? 1 : 0);
		testIfDivReadyToUpdateArrows(divCardsContainer, offsetCardLength);
	}
}

function testIfDivReadyToUpdateArrows(divCardsContainer, offsetCardLength) {
	
	if (divCardsContainer != null) {
	
		var id = divCardsContainer.id;
		var childs = divCardsContainer.childNodes;
		console.log(id + " childNodes.length = " + childs.length);

		if (! ((offsetCardLength == 1) 
				&& (divCardsContainer.cardsLength != null) 
				&& (divCardsContainer.cardsLength == childs.length))) {
			offsetCardLength = 0;
		}
		
		console.log(id + " nombre de cartes pris en compte : " + (childs.length - offsetCardLength));
		
		var s = "";
		var w;
		var sumWidth = 0;
		var zeroWidthFound = false;
		
		for (var i = 0; i < (childs.length - offsetCardLength); i++) {
			w = childs[i].offsetWidth;
			zeroWidthFound = (w == 0);
			s += w + ",";
			sumWidth += w;
		}		

		console.log(id + " " + s);

		if (zeroWidthFound) {
			console.log(id + " => au moins un 0 trouvé, on retente");

			setTimeout( function(){ 
				testIfDivReadyToUpdateArrows(divCardsContainer, offsetCardLength) 
				}, 100);

		} else {
			console.log(id + " => Les width sont ok");
			console.log(id + " => fin du timeout");
			console.log(id + " => Lancement du calcule");
			
			updateScrollArrows(divCardsContainer, offsetCardLength);
		}
		
	}
	
}

function updateScrollArrows(divCardsContainer, offsetCardLength) {

	console.log(divCardsContainer.id + " Update arrows");

	var elements = divCardsContainer.scrollElements;
	
	if (elements != null) {

		if (divCardsContainer != null) {
			
			var id = divCardsContainer.id;
			var childs = divCardsContainer.childNodes;
			
			var i = (childs.length - offsetCardLength) - 1;
			var cardWidth = childs[i].offsetWidth;
			var cardLeft = (childs[i].offsetLeft != null) ? childs[i].offsetLeft : 0;
			var sumWidthAndLeft = (cardWidth + cardLeft);
			
			// mémorisation du nombre de cartes réel sur la zone
			divCardsContainer.cardsLength = childs.length - offsetCardLength;
			
			console.log(id + " childNodes.length = " + childs.length + (offsetCardLength == 1 ? " (-1)" : ""));				
			console.log(id + " width + left of last card : " + cardWidth + " + " + cardLeft + " = " + sumWidthAndLeft);
			console.log(id + " test : " + sumWidthAndLeft + " >=? " + divCardsContainer.clientWidth);
			
			if (sumWidthAndLeft >= divCardsContainer.clientWidth) {
				
				var scrollMax = divCardsContainer.scrollWidth - divCardsContainer.clientWidth;
				
				console.log(id + " tenter d'afficher flèches");
				console.log(id + " scrollLeft = " + elements.divScrollCards.scrollLeft);
				console.log(id + " scrollMax = " + scrollMax);
				
				if (elements.divScrollCards.scrollLeft > 0) {
					elements.imgLeftArrow.style.display = "block";
					console.log(divCardsContainer.id + " flèche gauche : affichée");
				} else {
					elements.imgLeftArrow.style.display = "none";
					console.log(divCardsContainer.id + " flèche gauche : masquée");
				}
				
				if (elements.divScrollCards.scrollLeft < scrollMax) {
					elements.imgRightArrow.style.display = "block";
					console.log(divCardsContainer.id + " flèche droite : affichée");
				} else {
					elements.imgRightArrow.style.display = "none";
					console.log(divCardsContainer.id + " flèche droite : masquée");
				}
				
			} else {
				elements.imgLeftArrow.style.display = "none";
				elements.imgRightArrow.style.display = "none";
				console.log(id + " masquer flèches");
			}
		}
	}	
}