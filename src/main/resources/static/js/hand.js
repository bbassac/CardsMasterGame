var handDivCardsContainer;

function fillHand(playerId) {

	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "player/"+playerId+"/hand", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var cards = JSON.parse(xhttp.responseText);

    if (handDivCardsContainer == null) {
    	handDivCardsContainer = setAsBoardArea("hand",THEME_BLUE);
    }

	cleanArea(handDivCardsContainer);

	for (var i = 0; i < cards.length; i++) {
		addDomCardOnHand(cards[i]);
    }
}

function addDomCardOnHand(card) {

	if ((handDivCardsContainer != null) && (card != null)) {

		var domCard = getDomCard(card, gameImageHeight, CARD_DRAW_MODES_BOARD);
		handDivCardsContainer.appendChild(domCard.divCard);
	    
	    var menu = [
	        { text: MOVE_TO_BOARD, action: (function() { moveCardToBoard(this); }).bind(domCard) },
	        { text: MOVE_TO_TRAP, action: (function() { moveCardToTrap(this); }).bind(domCard) },
	        { text: MOVE_TO_EQUIPMENT, action: (function() { moveCardToEquipment(this); }).bind(domCard) },
	        { text: MOVE_TO_GRAVEYARD, action: (function() { moveHandCardToGraveyard(this); }).bind(domCard) },
	    ];
	
	    domCard.addMenu(menu);
	    domCard.setDraggable(true);
	}
}

function moveCardToBoard(domCard){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/board/"+domCard.getId(), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
    addDomCardOnBoardPlayer(domCard.card);
}

function moveCardToTrap(domCard){
    if ( domCard.card.metaData.kind == KIND_TRAP){
        var currentPlayerId = document.getElementById("currentPlayerId").value;

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/trap/"+domCard.getId(), false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        
        domCard.remove();
        addDomCardOnTraps(domCard.card);

    }else {
        alert(ERROR_TRAP);
    }
}

function moveCardToEquipment(domCard){
    if ( domCard.card.metaData.kind == KIND_EQUIPMENT){
        var currentPlayerId = document.getElementById("currentPlayerId").value;
        var cardId = domCard.card.id;

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "player/"+currentPlayerId+"/equipment/"+cardId, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        domCard.remove();
        addDomCardOnEquipments(domCard.card);
    }else{
        alert(ERROR_EQUIPMENT);
    }
}

function moveHandCardToGraveyard(domCard){
    
    var currentPlayerId = document.getElementById("currentPlayerId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "player/"+currentPlayerId+"/hand-to-graveyard/"+domCard.getId(), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    domCard.remove();
    addDomCardOnGraveyard(currentPlayerId, domCard.card, "graveyardId");    
}
