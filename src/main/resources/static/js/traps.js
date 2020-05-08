var trapsDivCardsContainer;

function fillTraps(playerId) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/traps", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);
    
    if (trapsDivCardsContainer == null) {
    	trapsDivCardsContainer = document.getElementById("traps");
    	setAsDropArea(trapsDivCardsContainer, trapsAllowDrop, trapsDrop);
    }

	trapsDivCardsContainer.innerHTML = '';
    
	for (var i = 0; i < cards.length; i++){
		 addDomCardOnTraps(cards[i]);
	}
}

function addDomCardOnTraps(card) {

    var domCard = getDomCard(card, trapImageHeight, CARD_DRAW_MODES_BOARD);
    domCard.divCardsContainer = trapsDivCardsContainer;
    trapsDivCardsContainer.appendChild(domCard.divCard);
	 
	var menu = [
		{ text: MOVE_TO_GRAVEYARD, action: (function() { moveCardFromTrapsToGraveyard(this); }).bind(domCard) },
	];

	domCard.addMenu(menu);
	domCard.setDraggable(true);

}

function moveCardFromTrapsToGraveyard(domCard){

    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId()+"/graveyard", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
    addDomCardOnGraveyard(currentPlayerId, domCard.card, "graveyardId");    
    
}

function trapsAllowDrop(fromDivId, toDivId, domCard) {
	
	var cardsLength = trapsDivCardsContainer.childNodes.length;
	
	return ((cardsLength < 3)
			&& (KIND_TRAP.localeCompare(domCard.card.metaData.kind) == 0)
			&& (fromDivId.localeCompare("hand_divCardsContainer") == 0));
}

function trapsDrop(fromDivId, toDivId, domCard) {
	moveCardToTrap(domCard);
}