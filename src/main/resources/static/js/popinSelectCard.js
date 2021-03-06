function displayPopinSelectCard(who, cards, addFunction, background) {

	showCardSelectPopin(background);

	var popinDiv = document.getElementById("popinCardsArea");
	popinDiv.innerHTML = ""; 

    for (var i=0; i< cards.length;i++) {

    	var domCard = new DomCard(cards[i], gameImageHeight, CARD_DRAW_MODES_BOARD);
    	popinDiv.appendChild(domCard.divCard);
    	
    	addPopinSelectCardButtons(domCard, addFunction, who);
    }
}

function addPopinSelectCardButtons(domCard, addFunction, who) {
	
	var buttonDiv = document.createElement("div");
	buttonDiv.id = "buttonDiv" + domCard.getId();
	buttonDiv.classList.add('popinSelectDivButton');
    domCard.divBackImg.appendChild(buttonDiv);

	// Bouton d'action d'ajout
    var button = document.createElement("button");
    button.classList.add('popinSelectButton');
	button.innerHTML = "+";
	button.title= MOVE_TO_HAND;
    button.cardDiv = domCard.divCard;
    button.addEventListener("click", (function() { popinSelectCardAddAction(this, addFunction, who); }).bind(domCard));
    buttonDiv.appendChild(button);        

	domCard.divCard.addEventListener('mouseenter', (function() { showAddButton(this); }).bind(buttonDiv));
	domCard.divCard.addEventListener('mouseleave', (function() { hideAddButton(this); }).bind(buttonDiv));
}

function popinSelectCardAddAction(domCard, addFunction, who) {

	domCard.divCard.remove();
	addFunction(parseInt(currentPlayerId), domCard, who);
}

function showAddButton(buttonDiv) {
	buttonDiv.style.display = 'block';
}

function hideAddButton(buttonDiv) {
	buttonDiv.style.display = 'none';
}