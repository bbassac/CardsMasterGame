function displayPopinSelectCard(who, cards, addFunction, background) {

    var currentPlayerId = document.getElementById("currentPlayerId").value;

	showCardSelectPopin(background);

	var popinDiv = document.getElementById("popinCardsArea");
	popinDiv.innerHTML = ""; 

    for (var i=0; i< cards.length;i++) {

    	var domCard = getDomCard(cards[i], gameImageHeight, CARD_DRAW_MODES_BOARD);
    	popinDiv.appendChild(domCard.divCard);
    	
    	addPopinSelectCardButtons(domCard, addFunction, who);
    }
}

function addPopinSelectCardButtons(domCard, addFunction, who) {
	
	var cardId = domCard.card.id;

	var buttonDiv = document.createElement("div");
	buttonDiv.id = "buttonDiv" + cardId;
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

	var currentPlayerId = document.getElementById("currentPlayerId").value;	
	
	domCard.remove();
	addFunction(parseInt(currentPlayerId), domCard.card, who);
}

function showAddButton(buttonDiv) {
	buttonDiv.style.display = 'block';
}

function hideAddButton(buttonDiv) {
	buttonDiv.style.display = 'none';
}